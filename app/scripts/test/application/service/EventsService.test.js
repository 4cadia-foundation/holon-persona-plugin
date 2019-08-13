import EventsService from '../../../core/application/service/EventsService';
import { letMeSeeYourDataSample } from '../../template/eventsSample'


let _eventsService;

beforeEach(() => {
    let getLogsMock = jest.fn(async (filterData) => {
        return letMeSeeYourDataSample;
    });
    let provider = {
        getLogs: getLogsMock
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
        expect(hashes).toContain(letMeSeeYourDataSample[0].transactionHash);
        expect(hashes).toContain(letMeSeeYourDataSample[1].transactionHash);
        expect(hashes.length).toBe(2);
    });
});

