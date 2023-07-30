import request from "supertest"
import HttpStatus from "http-status-codes"

import { LoginController } from "../../login/login";
import { app } from "../../../server";

describe(LoginController.name, () => {
    it('should return BAD_REQUEST error if username not passed in body', async () => {
        await request(app)
            .get('/api/login/')
            .send({ "password": "test-user-psw" }, { contentType: 'application/json' })
            .expect(HttpStatus.BAD_REQUEST)
    })
    it('should return BAD_REQUEST error if password not passed in body', async () => {
        await request(app)
            .get('/api/login/')
            .send({ "username": "test-user" }, { contentType: 'application/json' })
            .expect(HttpStatus.BAD_REQUEST)
    })
    it('should return BAD_REQUEST error if neither username nor password passed in body', async () => {
        await request(app)
            .get('/api/login/')
            .expect(HttpStatus.BAD_REQUEST)
    })
    it('should return ok if username and password passed', async () => {
        await request(app)
            .get('/api/login/')
            .send({ "username": "test-user", "password": "test-user-psw" }, { contentType: 'application/json' })
            .expect(HttpStatus.OK)
    })
})