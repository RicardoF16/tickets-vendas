const _ = require("lodash");
const admin = require("./firebase").admin;

let firenode = {};

// TODO: change everything to prototype
const RESERVED_WORDS = ["type", "required", "default", "enum"];

class Schema {
  constructor(entity) {
    if (!entity) {
      throw new Error("The entity cannot be null");
    }
    this.entity = entity;
  }

  isReservedAttribute(key) {
    return key == "index" || key == "__v" || key == "id" || key == "uid";
  }

  validateUpdate(entityEntry) {
    let check = {
      hasError: false,
      model: {},
      erros: []
    };

    Object.keys(entityEntry).forEach(key => {
      if (this.entity[key]) {
        const baseAttribute = this.entity[key];
        let entryAttribute = entityEntry[key];

        if (baseAttribute.default) {
          if (!entryAttribute) {
            entryAttribute = baseAttribute.default;
          }
        }
        if (baseAttribute.enum) {
          let index = baseAttribute.enum.indexOf(entryAttribute);
          if (index < 0) {
            check.hasError = true;
            check.erros.push({
              field: key,
              message: `Enum value must be [${baseAttribute.enum.join(", ")}]`
            });
          }
        }

        if (baseAttribute.required) {
          if (!entryAttribute) {
            check.hasError = true;
            check.erros.push({
              field: key,
              message: Array.isArray(baseAttribute.required)
                ? baseAttribute.required[1]
                : `The field ${key} is required`
            });
          }
        }

        if (
          entryAttribute === undefined ||
          entryAttribute === NaN ||
          entryAttribute === null
        ) {
          check.hasError = true;
          check.erros.push({
            field: key,
            message: `The field ${key} cannot contain values like (undefined, NaN, null)`
          });
        }
        check.model[key] = entryAttribute;
      } else if (this.isReservedAttribute(key)) {
        check.model[key] = entityEntry[key];
      } else {
        check.hasError = true;
        check.erros.push({
          field: key,
          message: `The field ${key} do not exist`
        });
      }
    });

    if (check.model.__v >= 0) {
      check.model.__v++;
    } else {
      check.model.__v = 0;
    }

    return check;
  }

  validateSave(entityEntry) {
    let check = {
      hasError: false,
      model: {},
      erros: []
    };

    if (!entityEntry) {
      entityEntry = {};
    }

    Object.keys(this.entity).forEach(key => {
      const baseAttribute = this.entity[key];
      let entryAttribute = entityEntry[key];

      if (baseAttribute.default) {
        if (!entryAttribute) {
          entryAttribute = baseAttribute.default;
        }
      }
      if (baseAttribute.enum) {
        let index = baseAttribute.enum.indexOf(entryAttribute);
        if (index < 0) {
          check.hasError = true;
          check.erros.push({
            field: key,
            message: `Enum value must be [${baseAttribute.enum.join(", ")}]`
          });
        }
      }

      if (baseAttribute.required) {
        if (!entryAttribute) {
          check.hasError = true;
          check.erros.push({
            field: key,
            message: Array.isArray(baseAttribute.required)
              ? baseAttribute.required[1]
              : `The field ${key} is required`
          });
        }
      }

      if (
        entryAttribute === NaN ||
        entryAttribute === null
      ) {
        check.hasError = true;
        check.erros.push({
          field: key,
          message: `The field ${key} cannot contain values like (undefined, NaN, null)`
        });
      }

      if (check.model.__v >= 0) {
        check.model.__v++;
      } else {
        check.model.__v = 0;
      }
      if(entryAttribute || entryAttribute == false) {
        check.model[key] = entryAttribute;
      }
    });

    return check;
  }
}

class Model {
  constructor() {
    this.version = "0.1";
  }

  ref(reference, schema) {
    if (typeof reference === "string" && schema instanceof Schema) {
      return new CollectionInstance(reference, schema);
    } else {
      throw new Error(
        "The param {reference} must be string and {schema} must be Schema"
      );
    }
  }
}

class CollectionInstance {
  constructor(reference, schema) {
    this.reference = admin.database().ref(reference);

    this.schema = schema;
  }

  rebuild(reference, schema) {
    console.error('inicio rebuild  reference 2>> ', reference);
    console.error('inicio rebuild  schema 2>> ', schema);
    if (reference) {
      this.reference = admin.database().ref(reference);
    }
    if (schema) {
      this.schema = schema;
    }

    return this;
  }

  query(collection) {
    return new QueryHelpers(collection);
  }

  create(entity) {
    console.log('entity', entity);
    return new Promise((resolve, reject) => {
      const validate = this.schema.validateSave(entity);

      if (!validate.hasError) {
        let id =
          entity.uid ||
          entity.id ||
          admin
            .database()
            .ref()
            .push().key;

        let entitySanitazed = validate.model;

        entitySanitazed.id = id;
        this.reference
          .limitToLast(1)
          .once("value")
          .then(entitySnap => {
            const lastestEntityRoot = entitySnap.val();

            if (lastestEntityRoot) {
              let lastestEntity = {};
              Object.keys(lastestEntityRoot).map(key => {
                lastestEntity = lastestEntityRoot[key];
              });
              entitySanitazed.index = lastestEntity.index + 1;
            } else {
              entitySanitazed.index = 0;
            }

            this.reference
              .child(id)
              .set(entitySanitazed)
              .then(createdEntity => {
                resolve(entitySanitazed);
              })
              .catch(err => {
                reject(err);
              });
            })
            .catch(err => {
            reject(err);
          });
      } else {
        reject(validate);
      }
    });
  }

  find(options) {
    //console.error('find(options) >> ', options);
    return new Promise((resolve, reject) => {
      let reference = this.reference;
      let page, perPage, offset;

      if (options && !options.where) {
        page = Number(options.page) || 1;
        perPage = Number(options.perPage) || 25;
        offset = (page - 1) * perPage;

        reference = this.reference
          .orderByChild("index")
          .startAt(offset)
          .endAt(offset + perPage);
      }

      let promises = [reference.once("value")];

      if (options && !options.where) {
        promises.push(this.count());
        options.internalQuery = true;
      }

      Promise.all(promises).then(values => {
        const entityValue = values[0].val();
        const count = values[1];
        const result = this.query(entityValue)
          .discover(options)
          .execute();

        if (!options.where) {
          result.total = count;
          let otimizedResult = {
            list: result,
            pages: Math.floor(count / perPage) + 1,
            current: page,
            perPage: perPage
          };
          resolve(otimizedResult);
        } else {
          resolve(result);
        }
      });
    });
  }

  findOne(options) {
    return new Promise((resolve, reject) => {
      let reference = this.reference;

      reference.once("value").then(entitySnap => {
        const entityValue = entitySnap.val();
        const page = this.query(entityValue)
          .discover(options)
          .execute();

        if (page.list.length) {
          resolve(page.list[0]);
        } else {
          resolve(null);
        }
      });
    });
  }

  findById(id) {
    console.log('inicio do findById >> firenode');
    return new Promise((resolve, reject) => {
      if (!id) {
        throw new Error("id cannot be null or empty");
      }
      this.reference
        .child(id)
        .once("value")
        .then(entitySnap => {
          let entity = entitySnap.val();
          console.log('let entity', entity );
          if (entity) {
            resolve(entity);
          } else {
            resolve();
          }
        }).catch(err => {
          reject(err);
        });
    });
  }

  update(id, entity) {
    return new Promise((resolve, reject) => {

      if (!id) {
        throw new Error("id cannot be null or empty");
      }

      if (entity) {
        this.reference
          .child(id)
          .update(entity)
          .then(success => resolve(success))
          .catch(err => reject(err));
      } else {
        reject();
      }
    });
  }

  save(id, entity) {
    if (!id) {
      throw new Error("id cannot be null or empty");
    }

    return new Promise((resolve, reject) => {
      const validate = this.schema.validateSave(entity);

      if (!validate.hasError) {
        this.reference.child(id).set(validate.model);
      } else {
        reject(validate);
      }
    });
  }

  delete(id) {
    if (!id) {
      throw new Error("id cannot be null or empty");
    }

    return new Promise((resolve, reject) => {
      this.reference
        .child(id)
        .remove()
        .then(success => {
          resolve(success);
        })
        .catch(err => reject(err));
    });
  }

  count() {
    return new Promise((resolve, reject) => {
      this.reference
        .limitToLast(1)
        .once("value")
        .then(entitySnap => {
          const lastestEntityRoot = entitySnap.val();
          let count = 0;

          if (lastestEntityRoot) {
            let lastestEntity = {};
            Object.keys(lastestEntityRoot).map(key => {
              lastestEntity = lastestEntityRoot[key];
            });
            count = lastestEntity.index + 1;
          }

          resolve(count);
        });
    });
  }
}

class QueryHelpers {
  constructor(collection) {
    if (_.isArray(collection)) {
      this.collection = collection;
    } else if (_.isObject(collection)) {
      this.collection = Object.keys(collection).map(key => collection[key]);
    } else {
      this.collection = [];
    }

    this.page = {};
    this._collection = _.cloneDeep(this.collection);
  }

  internalPaginator(page, perPage) {
    var page = Number(page) || 1,
      perPage = Number(perPage) || 25,
      offset = (page - 1) * perPage;

    this.collection = this.collection.slice(offset, offset + perPage);

    this.page = {
      pages: Math.floor(this.collection.length / perPage) + 1,
      current: page,
      perPage: perPage,
      total: this._collection.length
    };

    return this;
  }

  discover(query) {
    // pattern: api.henkoti.com.br/collection?select=name,age
    if (query && query.select) {
      this.select(query.select);
    }
    // pattern: api.henkoti.com.br/collection?where=(age,>,10),(person,like,bruno)
    if (query && query.where) {
      const conditions = query.where.split(")");
      conditions.forEach(item => {
        item = item.replace("(", "");
        const isValid = /[\d|\w|.]+,[>|<|=|!|\d|\w|\*]+,.+/.test(item);
        if (isValid) {
          const condition = item.split(",");
          this.where(condition[0], condition[1], condition[2]);
        }
      });
    }

    if(query && query.orderBy) {
      this.orderByDate();
    }

    if (query && query.where) {
      this.internalPaginator(query.page, query.perPage);
    }

    return this;
  }

  orderByDate() {
    this.collection = this.collection.sort((a, b) => {
      a = new Date(a.publicadoEm);
      b = new Date(b.publicadoEm);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  select(attribuites) {
    if (attribuites) {
      let fields = attribuites.split(",");

      this.collection = _.map(this.collection, iterator => {
        let newValue = {};

        _.forEach(fields, field => {
          newValue[field] = iterator[field];
        });
        return newValue;
      });
    }

    return this;
  }

  scanField(object, entry) {
    const entryArray = entry.split('.');
    entryArray.forEach(field => {
      if(object[field] || object[field] == 0 || object[field] == '' || object[field] == false) {
        object = object[field];
      } else {
        object = undefined;
      }
    });

    return object;
  }

  where(field, operator, value) {
    let minRange, maxRange;

    if (operator.includes("between") || operator.includes("range")) {
      let values = value.split(";");
      minRange = Number(values[0]);
      maxRange = Number(values[1]);
    }
  
    switch (operator) {
      case ">":
        this.collection = _.filter(this.collection, iterator => {
          return Number(this.scanField(iterator, field)) > Number(value);
        });
        break;
      case "<":
        this.collection = _.filter(this.collection, iterator => {
          return Number(this.scanField(iterator, field)) < Number(value);
        });
        break;
      case ">=":
        this.collection = _.filter(this.collection, iterator => {
          return Number(this.scanField(iterator, field)) >= Number(value);
        });
        break;
      case "<=":
        this.collection = _.filter(this.collection, iterator => {
          return Number(this.scanField(iterator, field)) <= Number(value);
        });
        break;
      case "=":
        this.collection = _.filter(this.collection, iterator => {
          return this.scanField(iterator, field) == value;
        });
        break;
      case "!=":
        this.collection = _.filter(this.collection, iterator => {
          return this.scanField(iterator, field) && this.scanField(iterator, field) != value;
        });
        break;
      case "range":
        this.collection = _.filter(this.collection, iterator => {
          return (
            this.scanField(iterator, field) &&
            this.scanField(iterator, field) >= minRange &&
            this.scanField(iterator, field) <= maxRange
          );
        });
        break;
      case "between":
        this.collection = _.filter(this.collection, iterator => {
          return (
            this.scanField(iterator, field) &&
            this.scanField(iterator, field) > minRange &&
            this.scanField(iterator, field) < maxRange
          );
        });
        break;
      case "like":
        this.collection = _.filter(this.collection, iterator => {
          return (
            this.scanField(iterator, field) &&
            this.scanField(iterator, field).toLowerCase().includes(value.toLowerCase())
          );
        });
        break;
      case "*":
        this.collection = _.filter(this.collection, iterator => {
          let isValid = false;
            if(iterator[field]) {
              Object.keys(iterator[field])
                .forEach(key => {
                  let currentField = iterator[field][key];
                  if (!Array.isArray(currentField) && currentField.includes) {
                    currentField = currentField.toLowerCase();
                    isValid = currentField.includes(value.toLowerCase()) || isValid;
                  }
                });
            }
            return isValid;
          });
        break;
    }

    return this;
  }

  execute() {
    if (this.page.current && this.page.current !== 0) {
      this.page.list = this.collection;
      return this.page;
    }
    return this.collection;
  }
}
firenode.QueryHelper = QueryHelpers;
firenode.schema = Schema;
firenode.model = new Model();
module.exports = firenode;
