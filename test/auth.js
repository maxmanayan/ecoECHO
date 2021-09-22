// imports
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

// middleware
chai.should();
chai.use(chaiHttp);

// tests
describe("All HTTP endpoints for auth router", () => {
  describe("REGISTER endpoint", () => {
    it("Should return a user object", (done) => {
      const newUser = {
        username: "New User 2",
        email: "new.user2@test.com",
        password: "guest",
        dateCreated: new Date(),
      };
      chai
        .request(server)
        .post("/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("username").eq(newUser.username);
          res.body.should.have.property("email").eq(newUser.email);
          res.body.should.have.property("password");
          res.body.should.have.property("dateCreated");
          done();
        });
    });

    it("If email already taken, should return 500 email-taken error", (done) => {
      const newUserWithTakenEmail = {
        username: "New New User",
        email: "new.user1@test.com",
        password: "guest1",
        dateCreated: new Date(),
      };
      chai
        .request(server)
        .post("/auth/register")
        .send(newUserWithTakenEmail)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property("error");
          done();
        });
    });

    it("If req has null fields, should return 400 bad request error", (done) => {
      const newUserWithNullFields = {
        username: "",
        email: "",
        password: "",
        dateCreated: new Date(),
      };
      chai
        .request(server)
        .post("/auth/register")
        .send(newUserWithNullFields)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("LOGIN endpoint", () => {
    it("Should return an object with a token and the user info", (done) => {
      const loginInfo = {
        email: "new.user1@test.com",
        password: "guest",
      };
      chai
        .request(server)
        .post("/auth/login")
        .send(loginInfo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          res.body.should.have.property("user");
          done();
        });
    });

    it("If password does not match, should return a 403 incorrect-password error", (done) => {
      const loginInfoWithWrongPassword = {
        email: "new.user1@test.com",
        password: "guess",
      };
      chai
        .request(server)
        .post("/auth/login")
        .send(loginInfoWithWrongPassword)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("error");
          done();
        });
    });

    it("If email not found, should return a 500 error", (done) => {
      const loginInfoWithUnRegisteredEmail = {
        email: "new.useafwfeawe@test.com",
        password: "guest",
      };
      chai
        .request(server)
        .post("/auth/login")
        .send(loginInfoWithUnRegisteredEmail)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property("error");
          done();
        });
    });

    it("If req has null fields, should return 400 bad request error", (done) => {
      const loginInfoWithNullFields = {
        email: "",
        password: "",
      };
      chai
        .request(server)
        .post("/auth/register")
        .send(loginInfoWithNullFields)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          done();
        });
    });
  });
});
