import SmartContract from './SmartContract';
import FIELD_STATUS from '../enums/FieldStatus';

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
    const tmpNumberOfFields = await this._contract.getPersonaNumberOfFields(this._wallet.address);
    const numberOfFields = parseInt(tmpNumberOfFields);
    return numberOfFields;
  }

  async getPersonalInfo() {
    const novoPersonalInfo = [];
    if (!this.walletAndContractConnect) {
      return novoPersonalInfo;
    }
    const tmpNumberOfFields = await this._contract.getPersonaNumberOfFields(this._wallet.address);
    const numberOfFields = parseInt(tmpNumberOfFields);
    console.log('transactor/getPersonalInfo/numberOfFields', numberOfFields);
    if (numberOfFields == 0) {
      return novoPersonalInfo;
    }
    for (let j = 0; j < numberOfFields; j++) {
      const field = await this._contract.getPersonaDataByFieldIndex(this._wallet.address, j);
      let statusValidacao = FIELD_STATUS.NOT_VALIDATED;
      const fieldName = field[0];
      const reputation = parseInt(field[3]);
      const numberOfValidations = parseInt(field[4]);
      // console.log('transactor/getPersonalInfo/field', field, fieldName, reputation, numberOfValidations);
      if (reputation > 0) {
        statusValidacao = FIELD_STATUS.VALIDATED;
      } else if ((reputation == 0) && (numberOfValidations > 0)) {
        console.log('transactor/getPersonalInfo/numberOfValidations > 0', field, fieldName, reputation, numberOfValidations);
        for (let y = 0; y < numberOfValidations; y++) {
          console.log('transactor/getPersonalInfo/ getPersonaDataValidatorDetails starting', this._wallet.address, fieldName, y);
          const validation = await this._contract.getPersonaDataValidatorDetails(this._wallet.address, fieldName, y);
          console.log('transactor/getPersonalInfo/getPersonaDataValidatorDetails/validation', validation);
          if (statusValidacao != FIELD_STATUS.VALIDATED) {
            statusValidacao = parseInt(validation[7]);
          }
        }
      } else {
        const lastStatus = await this.contract.GetFieldLastStatus(fieldName);
        statusValidacao = parseInt(lastStatus);
      }

      const descValidacao = this.getStatusValidationDescription(statusValidacao);
      const item = {
        field: field[0],
        valor: field[1],
        statusValidationDescription: descValidacao,
        statusValidationCode: statusValidacao,
      };
      novoPersonalInfo.push(item);
    }
    return novoPersonalInfo;
  }

  getStatusValidationDescription(statusValidacao) {
    switch (statusValidacao) {
      case FIELD_STATUS.VALIDATED:
        return 'Validated';
      case FIELD_STATUS.NOT_VALIDATED:
        return 'NotValidated';
      case FIELD_STATUS.CANNOT_EVALUATE:
        return 'CannotEvaluate';
      case FIELD_STATUS.NEW_DATA:
        return 'NotValidated';
      case FIELD_STATUS.VALIDATION_PENDING:
        return 'Pending';
      default:
        return null;
    }
  }
}
