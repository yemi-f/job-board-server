const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const User = require("../models/User");

//assert
chai.should();
chai.use(chaiHttp);

describe("Applicants", () => {
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

  describe("/GET applicants", () => {
    it("should fetch all applicants successfully", (done) => {
      chai
        .request(server)
        .get("/applicants")
        .set({ Authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.docs.should.be.a("array");
          res.body.docs.length.should.be.eql(res.body.count);
          done();
        });
    });
  });
});
