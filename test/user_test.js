const chai = require('chai');
const chaiHttp = require("chai-http");
const should = chai.should();

const LOCAL_URL = process.env.APP_URL || "http://localhost:9000";
const API_URL = process.env.APP_URL || "https://reunionprajeshsmapi.onrender.com";

chai.use(chaiHttp);

const userInfo = {

    "email": "goenjoy@gmail.com",
    "password":"9921"
};

const userCred = {
    "email" : "abcd.gmail.com",
    "password" : "9921"
};

describe('User API', () => {

    describe("Users /api", () => {

        it("Should create user", (done) => {
            chai
            .request(API_URL)
            .post("/user/api/signup")
            .send(userInfo)
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.be.json
                done();
            });
        });

        it("Should validate user", (done) => {
            chai
            .request(API_URL)
            .post("/user/api/signin")
            .send(userCred)
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should get all users", (done) => {
            chai
            .request(API_URL)
            .get("/user/api/all_users")
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });

        it("Should delete users", (done) => {
            chai
            .request(API_URL)
            .delete("/user/api/delete/63c7ae7dc329a4118e19d59c")
            .set('Content-Type' ,'application/json')
            .end((err, res)=>{
                if (err) done(err);
                res.should.have.status(200);
                // res.should.be.json;
                done();
            });
        });
    })
})