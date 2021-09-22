const err400 = {
  status: 400,
  message: "Bad Request",
};

const err401 = {
  status: 401,
  message: "Authentication error. Token required.",
};

const err403 = {
  status: 403,
  message: "Wrong Username/Password. Access denied.",
};

module.exports = { err400, err401, err403 };
