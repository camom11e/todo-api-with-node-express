
const chai = require("chai");
const chaiHttp = require("chai-http");
const express = require("express");
const app = express();
const notesRouter = require("../path/to/your/notesRouter"); 

chai.use(chaiHttp);
chai.should();

app.use(express.json());
app.use(notesRouter);

describe("Notes API Tests", () => {
    let noteId;

    it("should get all notes", (done) => {
        chai.request(app)
            .get("/notes")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should add a new note", (done) => {
        const newNote = {
            title: "Test Note",
            content: "This is a test note."
        };

        chai.request(app)
            .post("/note/")
            .send(newNote)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("id");
                res.body.title.should.equal(newNote.title);
                noteId = res.body.id; 
                done();
            });
    });

    it("should get a note by ID", (done) => {
        chai.request(app)
            .get(`/note/${noteId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("id").eql(noteId);
                done();
            });
    });

    it("should not find a note by ID", (done) => {
        chai.request(app)
            .get("/note/9999")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should update a note", (done) => {
        const updatedNote = {
            title: "Updated Test Note",
            content: "This note has been updated."
        };
        
        chai.request(app)
            .put(`/note/${noteId}`)
            .send(updatedNote)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });

    it("should get the updated note by ID", (done) => {
        chai.request(app)
            .get(`/note/${noteId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.title.should.equal("Updated Test Note");
                done();
            });
    });

    it("should delete a note", (done) => {
        chai.request(app)
            .delete(`/note/${noteId}`)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });

    it("should not find the deleted note", (done) => {
        chai.request(app)
            .get(`/note/${noteId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

