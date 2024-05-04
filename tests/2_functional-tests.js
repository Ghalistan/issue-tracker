const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    const project = 'MyProject'

    test('Create an issue with every field: POST request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .post(`/api/issues/${project}`)
            .type('form')
            .send({
                issue_title: 'Some issue',
                issue_text: 'Some issue text',
                created_by: 'Me',
                assigned_to: 'Someone?',
                status_text: 'Status?'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body, {
                    "issue_title": "Some issue",
                    "issue_text": "Some issue",
                    "created_by": "Me",
                    "assigned_to": "Someone?",
                    "status_text": "Status?"
                })
            })
    })

    test('Create an issue with only required fields: POST request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .post(`/api/issues/${project}`)
            .type('form')
            .send({
                issue_title: 'Some issue',
                issue_text: 'Some issue text',
                created_by: 'Me'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body, {
                    "issue_title": "Some issue",
                    "issue_text": "Some issue text",
                    "created_by": "Me",
                    "assigned_to": "",
                    "status_text": ""
                })
            })
    })

    test('Create an issue with missing required fields: POST request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .post(`/api/issues/${project}`)
            .type('form')
            .send({
                issue_title: 'Some issue',
                issue_text: 'Some issue text',
                created_by: 'Me'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body, {
                    "error": "required field(s) missing"
                })
            })
    })

    test('View issues on a project: GET request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .get(`/api/issues/${project}`)
            .get(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('View issues on a project with one filter: GET request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .post(`/api/issues/${project}?open=true`)
            .get(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .post(`/api/issues/${project}?open=true&assigned_to=Me`)
            .get(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Update one field on an issue: PUT request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/issues/${project}`)
            .type('form')
            .send({
                _id: 'someId',
                issue_title: 'newTitle'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/issues/${project}`)
            .type('form')
            .send({
                _id: 'someId',
                issue_title: 'newTitle',
                issue_text: 'newText'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Update an issue with missing _id: PUT request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/issues/${project}`)
            .type('form')
            .send({
                issue_title: 'newTitle',
                issue_text: 'newText'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/issues/${project}`)
            .type('form')
            .send()
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .post(`/api/issues/${project}`)
            .type('form')
            .send({
                _id: 'someId',
                issue_title: 'newTitle',
                issue_text: 'newText'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Delete an issue: DELETE request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .delete(`/api/issues/${project}`)
            .type('form')
            .send({
                _id: 'someId'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .delete(`/api/issues/${project}`)
            .type('form')
            .send({
                _id: 'someId'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })

    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', () => {
        chai
            .request(server)
            .keepOpen()
            .delete(`/api/issues/${project}`)
            .type('form')
            .send()
            .end(function (err, res) {
                assert.equal(res.status, 200)
            })
    })
});
