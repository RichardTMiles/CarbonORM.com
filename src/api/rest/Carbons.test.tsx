import {xdescribe, expect, test} from '@jest/globals';
import {CarbonReact} from "@carbonorm/carbonreact";
import {checkAllRequestsComplete} from "@carbonorm/carbonnode";
import {act, waitFor} from '@testing-library/react';
import {C6, iRestfulObjectArrayTypes, iCarbons, carbons } from "api/rest/C6";
import Carbons from "./Carbons";

const randomString = Math.random().toString(36).substring(7);
const randomInt = Math.floor(Math.random() * 1000000);
const fillString = 'string' + randomString + randomInt;

console.log('fillString', fillString);

/**
CREATE TABLE `carbon_carbons` (
  `entity_pk` binary(16) NOT NULL,
  `entity_fk` binary(16) DEFAULT NULL,
  `entity_tag` varchar(100) NOT NULL DEFAULT 'manually',
  PRIMARY KEY (`entity_pk`),
  UNIQUE KEY `entity_entity_pk_uindex` (`entity_pk`),
  KEY `entity_entity_entity_pk_fk` (`entity_fk`),
  CONSTRAINT `entity_entity_entity_pk_fk` FOREIGN KEY (`entity_fk`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

const Test_Data: iCarbons = {

}

export default Test_Data;

xdescribe('REST Carbons api', () => {

    let testData = Test_Data;

    test('GET POST PUT DELETE', async () => {

        await act(async () => {

            let selectAllResponse = await Carbons.Get({})

            if ('function' === typeof selectAllResponse) {
                throw Error('selectAllResponse is a promise, this typically means this specific get request has already run during test setup.');
            }

            // We don't care if it is filled or not, just that the request can be made.
            expect(selectAllResponse?.data?.rest).not.toBeUndefined();

            const postResponse = await Carbons.Post(testData);

            console.log('postResponse', postResponse?.data)

            expect(postResponse?.data?.created).not.toBeUndefined();

            const primaryKey = carbons.PRIMARY_SHORT[0];

            const postID = postResponse?.data?.created

            const singleRowSelect = await Carbons.Get({
                [C6.WHERE]: {
                    [carbons[primaryKey.toUpperCase()]]: postID,
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

            const multipleRowSelect = await Carbons.Get({
                [C6.WHERE]: {
                    [carbons[primaryKey.toUpperCase()]]: [C6.IN, [0, postID]],
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

            testData.entity_pk = fillString.substring(0, 16);
            testData.entity_fk = fillString.substring(0, 16);
            testData.entity_tag = fillString.substring(0, 100);

            // wait for the global state to be updated
            expect(CarbonReact.getState<iRestfulObjectArrayTypes>().carbons).not.toBeUndefined();

            const updateResponse = await Carbons.Put(testData)

            expect(updateResponse?.data?.updated).not.toBeUndefined();

            const deleteResponse = await Carbons.Delete({
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

