import { ethers } from 'ethers';

export function fieldHasSentToValidation(validationRequests, field) {
    if (!validationRequests) {
        return "1";
    }
    //console.log('helper/validations/field', ethers.utils.id(field));
    for (let k = 0; k < validationRequests.length; k++) {
        //console.log('helper/validations/fieldHasSentToValidation', validationRequests[k]);
        //console.log('helper/validations/field/compare', ethers.utils.id(field) == validationRequests[k][3].value);
        if (field == validationRequests[k]["field"]) {
            return "3";
        }
    }
    return "1";
}

export function getStatusValidationDescription(statusValidacao) {
    let descValidacao = "";
    //Validated = 0, NotValidated = 1, CannotEvaluate = 2, pending = 3
    if (statusValidacao == "0") {
        descValidacao = "Validated";
    } else if (statusValidacao == "1") {
        descValidacao = "NotValidated";
    } else if (statusValidacao == "2") {
        descValidacao = "CannotEvaluate";
    } else if (statusValidacao == "3") {
        descValidacao = "Pending";
    }
    return descValidacao;
}

export function updateStatusValidationField(personalInfo, validationRequests, field) {
    let newPersonalInfo = [];
    for (let k = 0; k < personalInfo.length; k++) {
        let item = {
            field: personalInfo[k].field,
            valor: personalInfo[k].valor,
            statusValidationDescription: personalInfo[k].statusValidationDescription,
            statusValidationCode: personalInfo[k].statusValidationCode,
        };
        //console.log('actions/getPersonaData/validationRequests/check', decodedTx.params[2].value, validationRequests[i][3].value, ethers.utils.id(decodedTx.params[2].value));
        if (personalInfo[k].field == field) {
            item.statusValidationCode = fieldHasSentToValidation(validationRequests, field);
            item.statusValidationDescription = getStatusValidationDescription(item.statusValidationCode);
        }
        newPersonalInfo.push(item);
    }
    return newPersonalInfo;
}
