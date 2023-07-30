const request = require('supertest');
import HttpStatus from "http-status-codes"

import { UserController } from "../user";
// import { MockUserService } from "../../../mocks/mockUserService";
// import { UserService } from "../../../services";
import { app } from "../../../server";

// jest.mock("../../../services/user.ts", () => ({
//     UserService: MockUserService 
// })); 

describe(UserController.name, () => {
    let token
    let createdUserId
    beforeAll(async () => {
        const response = await request(app)
            .get('/api/login/')
            .send({ "username": "test-user", "password": "test-user-psw" }, { contentType: 'application/json' })
            .expect(HttpStatus.OK)
        token = response.body.token
    })
    describe('getAllUsers', () => {
        it('should return forbidden error if token is invalid', async () => {
            await request(app)
                .get('/api/users/')
                .set('authorization', 'invalid-token')
                .expect(HttpStatus.FORBIDDEN)
        })
        it('should return all users if token is valid', async () => {
            await request(app)
                .get('/api/users/')
                .set('authorization', token)
                .expect(HttpStatus.OK)
        })
        it('should return BAD_REQUEST and correct error message if login field not provided', async () => {
            const response = await request(app)
                .post('/api/users/')
                .set('authorization', token)
                .send({ "password": "Automateduser1", "age": 45, "isDeleted": false })
                .expect(HttpStatus.BAD_REQUEST)
            expect(response.error.text).toEqual("Error validating request body. \"login\" is required.")
        })
        it('should return BAD_REQUEST and correct error message if password is not in correct format', async () => {
            const response = await request(app)
                .post('/api/users/')
                .set('authorization', token)
                .send({ "login": "automated-user-1", "password": "Automated_user1", "age": 45, "isDeleted": false })
                .expect(HttpStatus.BAD_REQUEST)
            expect(response.error.text).toEqual("Error validating request body. \"password\" with value \"Automated_user1\" fails to match the required pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.")
        })
        it('should return BAD_REQUEST and correct error message if age is less than 4', async () => {
            const response = await request(app)
                .post('/api/users/')
                .set('authorization', token)
                .send({ "login": "automated-user-1", "password": "Automateduser1", "age": 2, "isDeleted": false })
                .expect(HttpStatus.BAD_REQUEST)
            expect(response.error.text).toEqual('Error validating request body. "age" must be larger than or equal to 4.')
        })
        it('should return BAD_REQUEST and correct error message if age is greater than 130', async () => {
            const response = await request(app)
                .post('/api/users/')
                .set('authorization', token)
                .send({ "login": "automated-user-1", "password": "Automateduser1", "age": 150, "isDeleted": false })
                .expect(HttpStatus.BAD_REQUEST)
            expect(response.error.text).toEqual('Error validating request body. \"age\" must be less than or equal to 130.')
        })
        it('should create user', async () => {
            const response = await request(app)
                .post('/api/users/')
                .set('authorization', token)
                .send({ "login": "automated-user-1", "password": "Automateduser1", "age": 45, "isDeleted": false })
                .expect(HttpStatus.CREATED)
            expect(response.body).toEqual({ data: response.body.data, message: 'User created successfully' })
            console.log('\n\n\n\nresponse', response.body)
            createdUserId = response.body.data.id
        })
        it('should search users by login string and limit', async () => {
            const response = await request(app)
                .get('/api/users/search')
                .set('authorization', token)
                .send({ "loginSubstring": "automated", "limit": 5 })
                .expect(HttpStatus.OK)
        })
        it('should get a user by id', async () => {
            const response = await request(app)
                .get(`/api/users/${createdUserId}`)
                .set('authorization', token)
                .expect(HttpStatus.OK)
        })
        it('should update user by id', async () => {
            const response = await request(app)
                .put(`/api/users/${createdUserId}`)
                .set('authorization', token)
                .send({ "login": "updatd-automated-user-1", "password": "Automateduser1", "age": 45, "isDeleted": false })
                .expect(HttpStatus.OK)
            expect(response.body).toEqual({ data: response.body.data, message: 'User updated successfully' })
        })
        it('should soft delete user by id', async () => {
            await request(app)
                .delete(`/api/users/${createdUserId}`)
                .set('authorization', token)
                .expect(HttpStatus.OK, { message: 'User deleted successfully' })
            const response = await request(app)
                .get(`/api/users/${createdUserId}`)
                .set('authorization', token)
                .expect(HttpStatus.OK)
            expect(response.body.data.isDeleted).toBeTruthy()
        })
    })
})