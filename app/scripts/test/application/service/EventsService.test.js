import EventsService from '../../../core/application/service/EventsService';

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


});

