import {xdescribe, expect, test} from '@jest/globals';
import {CarbonReact} from "@carbonorm/carbonreact";
import {checkAllRequestsComplete} from "@carbonorm/carbonnode";
import {act, waitFor} from '@testing-library/react';
import {C6, iRestfulObjectArrayTypes, iComments, comments } from "api/rest/C6";
import Comments from "./Comments";

const randomString = Math.random().toString(36).substring(7);
const randomInt = Math.floor(Math.random() * 1000000);
const fillString = 'string' + randomString + randomInt;

console.log('fillString', fillString);

/**
CREATE TABLE `carbon_comments` (
  `parent_id` binary(16) NOT NULL,
  `comment_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `comment` blob NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `entity_comments_entity_parent_pk_fk` (`parent_id`),
  KEY `entity_comments_entity_user_pk_fk` (`user_id`),
  CONSTRAINT `entity_comments_entity_entity_pk_fk` FOREIGN KEY (`comment_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `entity_comments_entity_parent_pk_fk` FOREIGN KEY (`parent_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `entity_comments_entity_user_pk_fk` FOREIGN KEY (`user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

const Test_Data: iComments = {

}

export default Test_Data;

xdescribe('REST Comments api', () => {

    let testData = Test_Data;

    test('GET POST PUT DELETE', async () => {

        await act(async () => {

            let selectAllResponse = await Comments.Get({})

            if ('function' === typeof selectAllResponse) {
                throw Error('selectAllResponse is a promise, this typically means this specific get request has already run during test setup.');
            }

            // We don't care if it is filled or not, just that the request can be made.
            expect(selectAllResponse?.data?.rest).not.toBeUndefined();

            const postResponse = await Comments.Post(testData);

            console.log('postResponse', postResponse?.data)

            expect(postResponse?.data?.created).not.toBeUndefined();

            const primaryKey = comments.PRIMARY_SHORT[0];

            const postID = postResponse?.data?.created

            const singleRowSelect = await Comments.Get({
                [C6.WHERE]: {
                    [comments[primaryKey.toUpperCase()]]: postID,
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

            const multipleRowSelect = await Comments.Get({
                [C6.WHERE]: {
                    [comments[primaryKey.toUpperCase()]]: [C6.IN, [0, postID]],
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

            testData.parent_id = fillString.substring(0, 16);
            testData.comment_id = fillString.substring(0, 16);
            testData.user_id = fillString.substring(0, 16);
            testData.comment = fillString.substring(0, );

            // wait for the global state to be updated
            expect(CarbonReact.getState<iRestfulObjectArrayTypes>().comments).not.toBeUndefined();

            const updateResponse = await Comments.Put(testData)

            expect(updateResponse?.data?.updated).not.toBeUndefined();

            const deleteResponse = await Comments.Delete({
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

