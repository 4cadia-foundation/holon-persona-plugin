import SmartContract from './SmartContract';
import * as ValidationHelper from '../../src/helper/validations';

export default class Transactor extends SmartContract {

  constructor() {
    super();
    this.walletAndContractConnect = false;
  }

  setInternalProvider() {
    this.provider = this._options;
  }

  get contractWithSigner() {
    if (!this._wallet) {
      return null;
    }
    this._wallet = this._wallet.connect(this.provider);
    this._contract = this.contract.connect(this._wallet);
    this.walletAndContractConnect = true;
  }

  get wallet() {
    return this._wallet;
  }
  set wallet(paramWallet) {
    this._wallet = paramWallet;
  }

  async getPersonaNumberOfFields() {
    let tmpNumberOfFields = await this._contract.getPersonaNumberOfFields(this._wallet.address);
    let numberOfFields = parseInt(tmpNumberOfFields);
    return numberOfFields;
  }

  async getPersonalInfo(validationRequests) {
    let novoPersonalInfo = [];
    if (!this.walletAndContractConnect) {
      return novoPersonalInfo;
    }
    let tmpNumberOfFields = await this._contract.getPersonaNumberOfFields(this._wallet.address);
    let numberOfFields = parseInt(tmpNumberOfFields);
    console.log('transactor/getPersonalInfo/numberOfFields', numberOfFields);
    if (numberOfFields == 0) {
        return novoPersonalInfo;
    }
    for (let j=0; j<numberOfFields; j++) {
      let field = await this._contract.getPersonaDataByFieldIndex(this._wallet.address, j);     
      let statusValidacao = "1";
      let fieldName = field[0];
      let reputation = parseInt(field[3]);
      let numberOfValidations = parseInt(field[4]);
      // console.log('transactor/getPersonalInfo/field', field, fieldName, reputation, numberOfValidations);    
      //debugger   
      if (reputation>0) {
          statusValidacao = "0";
      } else if ( (reputation==0) && (numberOfValidations>0) ) {
          console.log('transactor/getPersonalInfo/numberOfValidations > 0', field, fieldName, reputation, numberOfValidations);    
          for (let y=0; y<numberOfValidations; y++) {
              console.log('transactor/getPersonalInfo/ getPersonaDataValidatorDetails starting', this._wallet.address, fieldName, y);    
              let validation = await this._contract.getPersonaDataValidatorDetails(this._wallet.address, fieldName, y);     
              console.log('transactor/getPersonalInfo/getPersonaDataValidatorDetails/validation', validation); 
              if (statusValidacao != 0) {
                  statusValidacao = parseInt(validation[7]);                    
              }
          }
      } else {
          // console.log('transactor/getPersonalInfo/ValidationHelper.fieldHasSentToValidation/starting', validationRequests, fieldName);    
          statusValidacao = ValidationHelper.fieldHasSentToValidation(validationRequests, fieldName);
          // console.log('transactor/getPersonalInfo/ValidationHelper.fieldHasSentToValidation/statusValidacao', statusValidacao);    
      }
      const descValidacao = ValidationHelper.getStatusValidationDescription(statusValidacao);
      let item = {
          field: field[0],
          valor: field[1],
          statusValidationDescription: descValidacao,
          statusValidationCode: statusValidacao,
      };
      novoPersonalInfo.push(item);
    }
    return novoPersonalInfo;
  }
}
