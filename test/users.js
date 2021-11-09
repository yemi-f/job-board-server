const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const User = require("../models/User");

//assert
chai.should();
chai.use(chaiHttp);

describe("Users", () => {
  let token;
  const testUser = {
    email: "test@test.com",
    password: "itestthings",
  };

  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/signup")
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(testUser)
      .end((err, res) => {
        token = res.text;
        res.should.have.status(200);
        done();
      });
  });

  afterEach((done) => {
    User.findOneAndDelete({ email: testUser.email }, (err) => {
      done();
    });
  });

  describe("/get users", () => {
    it("should fetch all users successfully", (done) => {
      chai
        .request(server)
        .get("/users")
        .set({ Authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
