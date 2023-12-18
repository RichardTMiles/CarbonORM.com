import {xdescribe, expect, test} from '@jest/globals';
import {CarbonReact} from "@carbonorm/carbonreact";
import {checkAllRequestsComplete} from "@carbonorm/carbonnode";
import {act, waitFor} from '@testing-library/react';
import {C6, iRestfulObjectArrayTypes, iWp_Links, wp_links } from "api/rest/C6";
import Wp_Links from "./Wp_Links";

const randomString = Math.random().toString(36).substring(7);
const randomInt = Math.floor(Math.random() * 1000000);
const fillString = 'string' + randomString + randomInt;

console.log('fillString', fillString);

/**
CREATE TABLE `carbon_wp_links` (
  `link_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_image` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_target` varchar(25) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_description` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_visible` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'Y',
  `link_owner` bigint unsigned NOT NULL DEFAULT '1',
  `link_rating` int NOT NULL DEFAULT '0',
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_notes` mediumtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `link_rss` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

const Test_Data: iWp_Links = {

    link_id: randomInt,

    link_url: fillString.substring(0, ),

    link_name: fillString.substring(0, ),

    link_image: fillString.substring(0, ),

    link_target: fillString.substring(0, ),

    link_description: fillString.substring(0, ),

    link_visible: fillString.substring(0, ),

    link_owner: randomInt,

    link_rel: fillString.substring(0, ),

    link_notes: fillString.substring(0, ),

    link_rss: fillString.substring(0, ),

}

export default Test_Data;

xdescribe('REST Wp_Links api', () => {

    let testData = Test_Data;

    test('GET POST PUT DELETE', async () => {

        await act(async () => {

            let selectAllResponse = await Wp_Links.Get({})

            if ('function' === typeof selectAllResponse) {
                throw Error('selectAllResponse is a promise, this typically means this specific get request has already run during test setup.');
            }

            // We don't care if it is filled or not, just that the request can be made.
            expect(selectAllResponse?.data?.rest).not.toBeUndefined();

            const postResponse = await Wp_Links.Post(testData);

            console.log('postResponse', postResponse?.data)

            expect(postResponse?.data?.created).not.toBeUndefined();

            const primaryKey = wp_links.PRIMARY_SHORT[0];

            const postID = postResponse?.data?.created

            const singleRowSelect = await Wp_Links.Get({
                [C6.WHERE]: {
                    [wp_links[primaryKey.toUpperCase()]]: postID,
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

            const multipleRowSelect = await Wp_Links.Get({
                [C6.WHERE]: {
                    [wp_links[primaryKey.toUpperCase()]]: [C6.IN, [0, postID]],
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

            testData.link_id = randomInt;
            testData.link_url = fillString.substring(0, 255);
            testData.link_name = fillString.substring(0, 255);
            testData.link_image = fillString.substring(0, 255);
            testData.link_target = fillString.substring(0, 25);
            testData.link_description = fillString.substring(0, 255);
            testData.link_visible = fillString.substring(0, 20);
            testData.link_owner = randomInt;
            testData.link_rating = randomInt;
            testData.link_updated = fillString.substring(0, );
            testData.link_rel = fillString.substring(0, 255);
            testData.link_notes = fillString.substring(0, );
            testData.link_rss = fillString.substring(0, 255);

            // wait for the global state to be updated
            expect(CarbonReact.getState<iRestfulObjectArrayTypes>().wp_links).not.toBeUndefined();

            const updateResponse = await Wp_Links.Put(testData)

            expect(updateResponse?.data?.updated).not.toBeUndefined();

            const deleteResponse = await Wp_Links.Delete({
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

