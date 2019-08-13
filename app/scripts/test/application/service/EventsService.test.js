'use strict';
import 'jest';
import EventsService from '../../../core/application/service/EventsService';


describe("GetEventHash Tests", () => {
    it("No logs should returns null", async () => {

        let getLogsMock = jest.fn(async (afilterData) => {
            return null;
        });
        let provider = {
            getLogs: getLogsMock
        };
        let service = new EventsService(provider);
        var hashResult = await service.GetEventHash(null);
        console.log('hash: ' + hashResult);

        expect(hashResult).toBeNull();
    });
});

