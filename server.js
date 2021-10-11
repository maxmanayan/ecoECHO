// imports
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const authRouter = require("./auth/routes/auth");
const { validateToken } = require("./auth/helpers/tokenValidation");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

// constants
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true,
  },
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const authenticated = await validateToken(req);
      return { authenticated };
    } catch (error) {
      console.log("No User");
    }
  },
});

// mongoose middleware
if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.MONGO_URI);
} else {
  mongoose.connect(process.env.MONGODB_URL);
}
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("MongoDB connected..."));

// graphQL/apollo middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer();

// APIs and middleware
app.use(express.json());

// routes
app.use("/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res, next) => {
    res.status(200).send("Climate-App");
  });
}

// error handlers
app.use((err, req, res, next) => {
  console.log("*** in Default Error Handler ***");
  res.status(err.status || 500);
  let error = {
    error: {
      status: err.status || 500,
      message: err.message,
    },
  };
  console.log(error);
  res.send(error);
});

// exports
module.exports = app.listen(PORT, () => {
  console.log(`Climate-app listening on http://localhost:${PORT}`);
});
