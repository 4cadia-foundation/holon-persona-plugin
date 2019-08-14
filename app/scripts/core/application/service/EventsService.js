
import abiDecoder from 'abi-decoder';
import { address, abi } from '../../../../config/abi';
import EVENT_TYPE from '../../../enums/EventType';
import EventTopic from '../../../../config/eventTopic';

let _eventTopicList;
let _provider;
export default class EventsService {
    constructor(provider) {
        this._eventTopicList = this.FillEventTopics();
        this._provider = provider;
        abiDecoder.addABI(abi);
    }

    async GetNewDataEvent(topicFilter = null) {
        return await this.GetEventData(EVENT_TYPE.NEWDATA, topicFilter);
    }
    async GetValidateMeEvent(topicFilter = null) {
        return await this.GetEventData(EVENT_TYPE.VALIDATEME, topicFilter);
    }
    async GetValidationResultEvent(topicFilter = null) {
        return await this.GetEventData(EVENT_TYPE.VALIDATIONRESULT, topicFilter);
    }
    async GetLetSeeYourDataEvent(topicFilter = null) {
        return await this.GetEventData(EVENT_TYPE.LETMESEEYOURDATA, topicFilter);
    }
    async GetDeliverDataEvent(topicFilter = null) {
        return await this.GetEventData(EVENT_TYPE.DELIVERDATA, topicFilter);
    }
    async GetEventData(eventType, topicFilter = null) {

        let filterData = {
            address: address,
            fromBlock: 4754554, //todo: filter from last filtered block(store)
            toBlock: 'latest',
            topics: this.GetTopicFilters(eventType, topicFilter)
        };

        let eventHashes = await this.GetEventHash(filterData);
        if (!eventHashes)
            return null;

        let eventResult = [];
        for (let hashIndex = 0; hashIndex < eventHashes.length; hashIndex++) {
            let receipt = await this.GetTransactionReceipt(eventHashes[hashIndex]);
            let decodedReceipt = abiDecoder.decodeLogs(receipt.logs);
            let eventData = decodedReceipt[0];
            let eventResultItem = new Object();
            eventData.events.map(event => {
                eventResultItem[event.name] = event.value;
            });
            eventResult.push(eventResultItem);
        }
        return eventResult;
    }
    GetTopicFilters(eventType, topicFilter = null) {
        let topics = [];
        topics[0] = this._eventTopicList[eventType];
        if (topicFilter) {
            for (let filterIndex = 0; filterIndex < topicFilter.length; filterIndex++) {
                topics[filterIndex + 1] = topicFilter[filterIndex];
            }
        }
        return topics;
    }
    FillEventTopics() {
        let eventTopics = new Object();
        eventTopics[EVENT_TYPE.NEWDATA] = EventTopic.newData;
        eventTopics[EVENT_TYPE.VALIDATEME] = EventTopic.validateMe;
        eventTopics[EVENT_TYPE.VALIDATIONRESULT] = EventTopic.validationResult;
        eventTopics[EVENT_TYPE.LETMESEEYOURDATA] = EventTopic.letMeSeeYourData;
        eventTopics[EVENT_TYPE.DELIVERDATA] = EventTopic.deliverData;
        return eventTopics;
    }
    async GetTransactionReceipt(hash) {
        let receipt = await this._provider.getTransactionReceipt(hash);
        return receipt;
    }
    async GetEventHash(filterData) {
        let events = await this._provider.getLogs(filterData);
        if (!events || events.length == 0)
            return null;

        let hashes = [];
        events.map(event => {
            hashes.push(event.transactionHash);
        });
        return hashes;
    }
}