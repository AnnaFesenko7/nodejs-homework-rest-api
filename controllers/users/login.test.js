const login = require("./login");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
// const request = require("supertest");

const mReq = {
  body: {
    password: "111111",
    email: "anna@gmail.com",
  },
};

const hashPassword = bcrypt.hashSync(mReq.body.password, 10);

const user = new User({
  _id: "63131c96d112226a59cfe43b",
  name: "Anna",
  email: "anna@gmail.com",
  subscription: "pro",
  password: hashPassword,
  verify: true,
  token: "",
});

describe("test login controller", () => {
  test("res status  equals 200", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, `${SECRET_KEY}`);

    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(async () => {
      user.token = token;

      return user;
    });
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await login(mReq, mRes);

    console.log(mRes.json.mock);
    expect(mRes.status).toBeCalledWith(200);

    // expect(mRes.json.mock).toHaveProperty([token]);
    // expect(mRes.user.email).toEqual(expect.not.stringContaining(expect));
    // expect(mRes.send.user.password).toEqual(
    //   expect.not.stringContaining(expect)
    // );
  });
});
