import SmartContract from "../../../scripts/core/SmartContract";
const smartContract = new smartContrct();
init();


async function init (){

    await smartContract.SmartContractInitialization();
}

export function getPersonaData(address=''){
    return dispatch =>{
        smartContract.getPersonaData(address, 'email')
    }

}