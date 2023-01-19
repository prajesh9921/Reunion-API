const chai = require('chai');
const chaiHttp = require("chai-http");
const should = chai.should();

const LOCAL_URL = process.env.APP_URL || "http://localhost:9000";
const API_URL = process.env.APP_URL || "https://reunionprajeshsmapi.onrender.com";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2QuZ21haWwuY29tIiwiaWQiOiI2M2M3OWUxMWM3NzBmZDlmNWEyYzIzN2IiLCJpYXQiOjE2NzQwMjY1OTR9.HL-1LUBBi8s81VpMqCWUC5frGQHierWVaIG4cIcCQ6U";

const ID = "63c7a3dc5630e8c1e21bbf64";

chai.use(chaiHttp);

const createUser = {
    "title":"Imagica",
    "desc":"Theme park, water park",
    "comments":["Awesome ride"],
    "likes": 10,
    "follow":false
};

const Comment = {
    "comments": [
        "Nice car",
        "Broom broom"
    ]
};

describe('Posts API', () => {

    describe("GET /api/all_posts", ()=> {
        it("Should get all posts", (done) => {
            chai
            .request(API_URL)
            .get("/posts/api/all_posts")
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.be.json;
                res.should.have.status(200);
                done();
            });
        });

        it("Should not get all posts", (done) => {
            chai
            .request(API_URL)
            .get("/posts/api/all_post")
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(404);
                done();
            });
        });

        it("Should get all post by id", (done) => {
            chai
            .request(API_URL)
            .get(`/posts/api/post/${ID}`)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                done();
            });
        });

        it("Should create post", (done) => {
            chai
            .request(API_URL)
            .post("/posts/api/posts")
            .send(createUser)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should follow post", (done) => {
            chai
            .request(API_URL)
            .patch(`/posts/api/follow/${ID}`)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should Unfollow post", (done) => {
            chai
            .request(API_URL)
            .patch(`/posts/api/unfollow/${ID}`)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should Like post", (done) => {
            chai
            .request(API_URL)
            .patch(`/posts/api/like/${ID}`)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should unlike post", (done) => {
            chai
            .request(API_URL)
            .patch(`/posts/api/unlike/${ID}`)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should add comment", (done) => {
            chai
            .request(API_URL)
            .patch(`/posts/api/comment/${ID}`)
            .send(Comment)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should delete post", (done) => {
            chai
            .request(API_URL)
            .delete("/posts/api/delete/63c8408b201f871155fd581e")
            .send(Comment)
            .set({ Authorization: {token} })
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });
        
    });
})