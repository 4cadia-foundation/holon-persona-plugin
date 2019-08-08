import FilterEventsBlockchain from '../../../scripts/core/FilterEventsBlockchain';


export function toggleDocuments (module, doc){
    return {
        type: 'SET_MODULE_ACTIVE',
        module, doc
      }
}


export function publicKey() {

    const filter = {};
    filter.fromBlock = 4664439;
    filter.toBlock = 'latest';
    filter.topics = [ '0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf' ];

    
    return async (dispatch) => {
        try {

            const filterEventsBlockchain = new FilterEventsBlockchain(filter);
            await filterEventsBlockchain.filterInitialization();
            
            filterEventsBlockchain.getSenderPublicKey("0xc3d8DFCA4b2387D1d0Bf8A7C4D7B361a26863AAC")
            .then(publicKey => {
                dispatch({type: 'SET_PUBLIC_KEY', publicKey: publicKey.toString('hex')});
            });
            
        } catch (exception) {
            dispatch({type: 'ERROR_PUBLIC_KEY', error: exception.message});
        }
       
    }
}
  