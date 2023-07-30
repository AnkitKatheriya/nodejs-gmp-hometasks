const request = require('supertest');
import HttpStatus from "http-status-codes"

import { GroupController } from "../group";
import { app } from "../../../server";

describe(GroupController.name, () => {
    let token
    let createdGroupId
    beforeAll(async () => {
        const response = await request(app)
            .get('/api/login/')
            .send({ "username": "test-user", "password": "test-user-psw" }, { contentType: 'application/json' })
            .expect(HttpStatus.OK)
        token = response.body.token
    })
    describe('getAllGroups', () => {
        it('should return forbidden error if token is invalid', async () => {
            await request(app)
                .get('/api/groups/')
                .set('authorization', 'invalid-token')
                .expect(HttpStatus.FORBIDDEN)
        })
        it('should return all groups if token is valid', async () => {
            await request(app)
                .get('/api/groups/')
                .set('authorization', token)
                .expect(HttpStatus.OK)
        })
        it('should return BAD_REQUEST and correct error message if name field not provided', async () => {
            const response = await request(app)
                .post('/api/groups/')
                .set('authorization', token)
                .send({ "permissions": ["READ"] })
                .expect(HttpStatus.BAD_REQUEST)
            expect(response.error.text).toEqual("Error validating request body. \"name\" is required.")
        })
        it('should return BAD_REQUEST and correct error message if permissions field not provided', async () => {
            const response = await request(app)
                .post('/api/groups/')
                .set('authorization', token)
                .send({ "name": "group-1" })
                .expect(HttpStatus.BAD_REQUEST)
            expect(response.error.text).toEqual("Error validating request body. \"permissions\" is required.")
        })
        it('should create group', async () => {
            const response = await request(app)
                .post('/api/groups/')
                .set('authorization', token)
                .send({ "name": "group-1", "permissions": ["READ"] })
                .expect(HttpStatus.CREATED)
            expect(response.body).toEqual({ data: response.body.data, message: 'Group created successfully' })
            createdGroupId = response.body.data.id
        })
        it('should get group by id', async () => {
            const response = await request(app)
                .get(`/api/groups/${createdGroupId}`)
                .set('authorization', token)
                .expect(HttpStatus.OK)
        })
        it('should update group by id', async () => {
            const response = await request(app)
                .put(`/api/groups/${createdGroupId}`)
                .set('authorization', token)
                .send({ "name": "updated-group-1", "permissions": ["READ"] })
                .expect(HttpStatus.OK)
            expect(response.body).toEqual({ data: response.body.data, message: 'Group updated successfully' })
        })
        it('should hard delete group by id', async () => {
            await request(app)
                .delete(`/api/groups/${createdGroupId}`)
                .set('authorization', token)
                .expect(HttpStatus.OK, { message: 'Group deleted successfully' })
        })
        it('should not found deleted group', async () => {
            const response = await request(app)
                .get(`/api/groups/${createdGroupId}`)
                .set('authorization', token)
                .expect(HttpStatus.NOT_FOUND, {
                    error: 'Group does not exists'
                })
            expect(response.body.data.isDeleted).toBeTruthy()
        })
    })
})