export enum TypeItem {
    vehicle = 0,
    people = 1,
    pet = 2,
}

export enum StatusEnum {
    found = 0,
    lost = 1
}

export enum TypeUser {
    admin = 99,
    user = 1
}

export enum ImgsApp {
    // tslint:disable-next-line:max-line-length
    pinPet = 'https://firebasestorage.googleapis.com/v0/b/pet-car-people-prod.appspot.com/o/imgsApp%2Fpin_pets.png?alt=media&token=7e2ab631-3896-4cac-9714-d312a3130fcb',
    // tslint:disable-next-line:max-line-length
    pinPeople = 'https://firebasestorage.googleapis.com/v0/b/pet-car-people-prod.appspot.com/o/imgsApp%2Fpin_pessoas.png?alt=media&token=19682f7b-63bf-409d-8549-deeed3b78a77',
    // tslint:disable-next-line:max-line-length
    pinVehicle = 'https://firebasestorage.googleapis.com/v0/b/pet-car-people-prod.appspot.com/o/imgsApp%2Fpin_veiculos.png?alt=media&token=369b2e1c-060c-4898-b6eb-954085794470',
    mapActive = 'assets/imgs/tab_mapa_on.svg',
    mapInactive = 'assets/imgs/tab_mapa_off.svg',
    vehicleInactive = 'assets/imgs/tab_veiculos_off.svg',
    vehicleActive = 'assets/imgs/tab_veiculos_on.svg',
    peopleInactive = 'assets/imgs/tab_pessoas_off.svg',
    peopleActive = 'assets/imgs/tab_pessoas_on.svg',
    petInactive = 'assets/imgs/tab_pets_off.svg',
    petActive = 'assets/imgs/tab_pets_on.svg'
}
