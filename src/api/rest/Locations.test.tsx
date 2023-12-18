import {xdescribe, expect, test} from '@jest/globals';
import {CarbonReact} from "@carbonorm/carbonreact";
import {checkAllRequestsComplete} from "@carbonorm/carbonnode";
import {act, waitFor} from '@testing-library/react';
import {C6, iRestfulObjectArrayTypes, iLocations, locations } from "api/rest/C6";
import Locations from "./Locations";

const randomString = Math.random().toString(36).substring(7);
const randomInt = Math.floor(Math.random() * 1000000);
const fillString = 'string' + randomString + randomInt;

console.log('fillString', fillString);

/**
CREATE TABLE `carbon_locations` (
  `entity_id` binary(16) NOT NULL,
  `latitude` varchar(225) DEFAULT NULL,
  `longitude` varchar(225) DEFAULT NULL,
  `street` varchar(225) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `elevation` varchar(40) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  PRIMARY KEY (`entity_id`),
  UNIQUE KEY `entity_location_entity_id_uindex` (`entity_id`),
  CONSTRAINT `entity_location_entity_entity_pk_fk` FOREIGN KEY (`entity_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

const Test_Data: iLocations = {

}

export default Test_Data;

xdescribe('REST Locations api', () => {

    let testData = Test_Data;

    test('GET POST PUT DELETE', async () => {

        await act(async () => {

            let selectAllResponse = await Locations.Get({})

            if ('function' === typeof selectAllResponse) {
                throw Error('selectAllResponse is a promise, this typically means this specific get request has already run during test setup.');
            }

            // We don't care if it is filled or not, just that the request can be made.
            expect(selectAllResponse?.data?.rest).not.toBeUndefined();

            const postResponse = await Locations.Post(testData);

            console.log('postResponse', postResponse?.data)

            expect(postResponse?.data?.created).not.toBeUndefined();

            const primaryKey = locations.PRIMARY_SHORT[0];

            const postID = postResponse?.data?.created

            const singleRowSelect = await Locations.Get({
                [C6.WHERE]: {
                    [locations[primaryKey.toUpperCase()]]: postID,
                }
            })

            if ('function' === typeof singleRowSelect) {
                throw Error('singleRowSelect is a promise, this is unexpected.');
            }

            console.log('singleRowSelect', singleRowSelect?.data)

            // Ensure the expected response datastructure is returned
            expect(singleRowSelect?.data?.rest).not.toBeUndefined();

            // Make sure the previously created post is now returned
            expect(typeof singleRowSelect?.data?.rest).toEqual('object');

            // todo - make this work correctly with multiple primary keys
            const selectedPostId = singleRowSelect?.data?.rest[0][primaryKey]

            expect(selectedPostId).toEqual(postID);

            const multipleRowSelect = await Locations.Get({
                [C6.WHERE]: {
                    [locations[primaryKey.toUpperCase()]]: [C6.IN, [0, postID]],
                }
            })

            if ('function' === typeof multipleRowSelect) {
                throw Error('singleRowSelect is a promise, this is unexpected.');
            }

            console.log('singleRowSelect', multipleRowSelect?.data)

            // Ensure the expected response datastructure is returned
            expect(multipleRowSelect?.data?.rest).not.toBeUndefined();

            // Make sure the previously created post is now returned
            expect(typeof multipleRowSelect?.data?.rest).toEqual('object');

            testData[primaryKey] = postID

            testData.entity_id = fillString.substring(0, 16);
            testData.latitude = fillString.substring(0, 225);
            testData.longitude = fillString.substring(0, 225);
            testData.street = fillString.substring(0, 225);
            testData.city = fillString.substring(0, 40);
            testData.state = fillString.substring(0, 10);
            testData.elevation = fillString.substring(0, 40);
            testData.zip = randomInt;

            // wait for the global state to be updated
            expect(CarbonReact.getState<iRestfulObjectArrayTypes>().locations).not.toBeUndefined();

            const updateResponse = await Locations.Put(testData)

            expect(updateResponse?.data?.updated).not.toBeUndefined();

            const deleteResponse = await Locations.Delete({
                [primaryKey]: postID
            })

            console.log('deleteResponse', deleteResponse?.data)

            expect(deleteResponse?.data?.deleted).not.toBeUndefined();

            await waitFor(async () => {
                expect(checkAllRequestsComplete()).toEqual(true);
            }, {timeout: 10000, interval: 1000});

        })

    }, 100000);

})

