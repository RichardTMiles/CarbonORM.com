import {xdescribe, expect, test} from '@jest/globals';
import {CarbonReact} from "@carbonorm/carbonreact";
import {checkAllRequestsComplete} from "@carbonorm/carbonnode";
import {act, waitFor} from '@testing-library/react';
import {C6, iRestfulObjectArrayTypes, iWp_Options, wp_options } from "api/rest/C6";
import Wp_Options from "./Wp_Options";

const randomString = Math.random().toString(36).substring(7);
const randomInt = Math.floor(Math.random() * 1000000);
const fillString = 'string' + randomString + randomInt;

console.log('fillString', fillString);

/**
CREATE TABLE `carbon_wp_options` (
  `option_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `autoload` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`),
  KEY `autoload` (`autoload`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

const Test_Data: iWp_Options = {

    option_id: randomInt,

    option_name: fillString.substring(0, ),

    option_value: fillString.substring(0, ),

    autoload: fillString.substring(0, ),

}

export default Test_Data;

xdescribe('REST Wp_Options api', () => {

    let testData = Test_Data;

    test('GET POST PUT DELETE', async () => {

        await act(async () => {

            let selectAllResponse = await Wp_Options.Get({})

            if ('function' === typeof selectAllResponse) {
                throw Error('selectAllResponse is a promise, this typically means this specific get request has already run during test setup.');
            }

            // We don't care if it is filled or not, just that the request can be made.
            expect(selectAllResponse?.data?.rest).not.toBeUndefined();

            const postResponse = await Wp_Options.Post(testData);

            console.log('postResponse', postResponse?.data)

            expect(postResponse?.data?.created).not.toBeUndefined();

            const primaryKey = wp_options.PRIMARY_SHORT[0];

            const postID = postResponse?.data?.created

            const singleRowSelect = await Wp_Options.Get({
                [C6.WHERE]: {
                    [wp_options[primaryKey.toUpperCase()]]: postID,
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

            const multipleRowSelect = await Wp_Options.Get({
                [C6.WHERE]: {
                    [wp_options[primaryKey.toUpperCase()]]: [C6.IN, [0, postID]],
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

            testData.option_id = randomInt;
            testData.option_name = fillString.substring(0, 191);
            testData.option_value = fillString.substring(0, );
            testData.autoload = fillString.substring(0, 20);

            // wait for the global state to be updated
            expect(CarbonReact.getState<iRestfulObjectArrayTypes>().wp_options).not.toBeUndefined();

            const updateResponse = await Wp_Options.Put(testData)

            expect(updateResponse?.data?.updated).not.toBeUndefined();

            const deleteResponse = await Wp_Options.Delete({
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

