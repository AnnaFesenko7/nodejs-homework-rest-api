const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("pablic"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  let errorMessage = message;

  if (status === 500) {
    errorMessage = "Server error";
  }

  res
    .status(status)
    .json({ status: "error", code: status, message: errorMessage });
});

module.exports = app;
