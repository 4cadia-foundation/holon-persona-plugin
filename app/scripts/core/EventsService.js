
import abiDecoder from 'abi-decoder';
import { address, abi } from '../../config/abi';
let _eventTopicList;
let _provider;
export default class EventsService {
    constructor(eventTopic, provider) {
        this._eventTopicList = eventTopic;
        this._provider = provider;
        abiDecoder.addABI(abi);
    }
    async GetEventData(eventName) {

        let filterData = {
            address: address,
            fromBlock: 4754554, //todo: filter from last filtered block(store)
            toBlock: 'latest',
            topics: [this._eventTopicList[eventName]]
        };
        let eventHashes = await this.GetEventHash(filterData);
        if (!eventHashes) //testar 0
            return null;

        let eventData = new Object();
        for (let hashIndex = 0; hashIndex < eventHashes.length; hashIndex++) {
            let receipt = await this.GetTransactionReceipt(eventHashes[hashIndex]);
            let decodedReceipt = abiDecoder.decodeLogs(receipt.logs);
            let eventData = decodedReceipt[0];
            eventData.events.map(event => {
                eventData[event.name] = event.value;
            });
        }
        return eventData;
    }
    async GetTransactionReceipt(hash) {
        let receipt = await this._provider.getTransactionReceipt(hash);
        return receipt;
    }
    async GetEventHash(filterData) {
        let events = await this._provider.getLogs(filterData);
        let hashes = [];
        events.map(event => {
            hashes.push(event.transactionHash);
        });
        return hashes;
    }
}