const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//assert
chai.should();
chai.use(chaiHttp);

describe("Jobs", () => {
  describe("Test GET /jobs", () => {
    it("should get all jobs", (done) => {
      chai
        .request(server)
        .get("/jobs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.docs.should.be.a("array");
          res.body.docs.length.should.not.be.eql(0);
          res.body.docs.length.should.be.eql(res.body.count);
          done();
        });
    });
  });

  describe("Test GET /jobs/:id", () => {
    it("should get a job by ID", (done) => {
      const id = "5ff5efbd67759d712d4f55c0";
      chai
        .request(server)
        .get(`/jobs/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("title");
          res.body.should.have.property("responsibilities");
          res.body.should.have.property("requirements");
          res.body.should.have.property("department");
          res.body.should.have.property("location");
          res.body.should.have.property("employmentType");
          res.body.should.have.property("aboutThisRole");
          res.body.should.have.property("_id").eql(id);
          done();
        });
    });
  });

  describe("Test GET route /jobs/:id", () => {
    it("should not return a job with an invalid ID", (done) => {
      const id = "invalid job ID";
      chai
        .request(server)
        .get(`/jobs/${id}`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("Test /POST job", () => {
    it("should not POST a job when user is unauthorized", (done) => {
      let job = {
        title: "QA Tester",
        location: "Hamilton, ON",
        department: "Information Technology",
        employmentType: "Full-Time",
        aboutThisRole: "Asfsfs fs df sdf s fsdfsdfsdf sdfsdfsfsdfsd f.",
        responsibilities: ["a", "b", "c", "d"],
        requirements: ["u", "v", "w", "x", "y", "z"],
      };
      chai
        .request(server)
        .post("/jobs")
        .send(job)
        .end((err, res) => {
          res.should.have.status(401);
          res.header.should.not.have.property("Authorization");
          done();
        });
    });
  });
});
