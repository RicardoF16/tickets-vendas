const YAML = require('yamljs');
const path = require('path');

class DocController {
  getAll(req, res){
    const apiDoc = YAML.load(path.join(__dirname,  'api.yaml'));
    res.send(apiDoc);
  }
}

module.exports = new DocController();