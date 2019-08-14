import EventsService from '../../../core/application/service/EventsService';
import { letMeSeeYourDataSample } from '../../template/eventsSample'
import EVENT_TYPE from '../../../../scripts/enums/EventType';
import EventTopic from '../../../../config/eventTopic';

let _eventsService;

beforeEach(() => {
    let getLogsMock = jest.fn(async (filterData) => {
        return letMeSeeYourDataSample.event;
    });
    let transReceiptMock = jest.fn(async (hash) => {
        return letMeSeeYourDataSample.eventReceipt;
    });

    let provider = {
        getLogs: getLogsMock,
        getTransactionReceipt: transReceiptMock
    };
    _eventsService = new EventsService(provider);
});

describe("GetEventHash Tests", () => {
    it("No logs should returns null", async () => {

        let getLogsMock = jest.fn(async (filterData) => {
            return null;
        });
        let provider = {
            getLogs: getLogsMock
        };
        let service = new EventsService(provider);
        var hashResult = await service.GetEventHash(null);
        expect(hashResult).toBeNull();
    });

    it("Returns 2 transactionHashes", async () => {
        var hashes = await _eventsService.GetEventHash(null);
        expect(hashes).toContain(letMeSeeYourDataSample.event[0].transactionHash);
        expect(hashes.length).toBe(letMeSeeYourDataSample.event.length);
    });
});

describe("GetTopicFilters Tests", () => {
    it("No filterTopic retuns at least eventType hash as default filter", () => {
        let topics = _eventsService.GetTopicFilters(EVENT_TYPE.NEWDATA);
        expect(topics).toContain(EventTopic.newData);
        expect(topics.length).toBe(1);
    });

    it("When using filters retuns topic hash and filters successfuly", () => {
        let filters = ['filter1', 'filter2'];
        let topics = _eventsService.GetTopicFilters(EVENT_TYPE.LETMESEEYOURDATA, filters);
        expect(topics).toContain(EventTopic.letMeSeeYourData);
        expect(topics).toContain(filters[0]);
        expect(topics).toContain(filters[1]);
        expect(topics.length).toBe(3);
    });
});

describe("FillEventTopics Tests", () => {
    it("Correctly adds all smart contracts event hashes", () => {
        let events = _eventsService.FillEventTopics();
        expect(events[EVENT_TYPE.NEWDATA]).toBe(EventTopic.newData);
        expect(events[EVENT_TYPE.VALIDATEME]).toBe(EventTopic.validateMe);
        expect(events[EVENT_TYPE.VALIDATIONRESULT]).toBe(EventTopic.validationResult);
        expect(events[EVENT_TYPE.LETMESEEYOURDATA]).toBe(EventTopic.letMeSeeYourData);
        expect(events[EVENT_TYPE.DELIVERDATA]).toBe(EventTopic.deliverData);
    });
});

describe("GetLetSeeYourDataEvent Tests", () => {
    it("Returns event mapped as an object successfuly", async () => {
        let eventResult = await _eventsService.GetLetSeeYourDataEvent(null);
        expect(eventResult[0].requester).toBe(letMeSeeYourDataSample.decodedEvent.requester);
        expect(eventResult[0].persona).toBe(letMeSeeYourDataSample.decodedEvent.persona);
        expect(eventResult[0].field).toBe(letMeSeeYourDataSample.decodedEvent.field);
        expect(eventResult.length).toBe(1);
    });
});