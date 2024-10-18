var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");
var paymentlinkRouter = require("./routes/paymentlink");
var orderRouter = require("./routes/order");
var payoutRouter = require("./routes/payout");
var transactionRouter = require("./routes/transaction");
var paymenthistoryRouter = require("./routes/paymenthistory");
var smtpRouter = require("./routes/smtp");
var historyRouter = require("./routes/history");
var distributorRouter = require("./routes/distributor");
var distributor_payoutRouter = require("./routes/distributor_payout");
var distributor_transactionRouter = require("./routes/distributor_transaction");
var walletcreditRouter = require("./routes/walletcredit");
var walletdebitRouter = require("./routes/walletdebit");
var pgtransferRouter = require("./routes/pgtransfer");
var rechargeRouter = require("./routes/recharge");
var bbpsRouter = require("./routes/bbps");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/paymentlink", paymentlinkRouter);
app.use("/order", orderRouter);
app.use("/payout", payoutRouter);
app.use("/transaction", transactionRouter);
app.use("/paymenthistory", paymenthistoryRouter);
app.use("/smtp", smtpRouter);
app.use("/history", historyRouter);
app.use("/distributor", distributorRouter);
app.use("/distributor_payout", distributor_payoutRouter);
app.use("/distributor_transaction", distributor_transactionRouter);
app.use("/walletcredit", walletcreditRouter);
app.use("/walletdebit", walletdebitRouter);
app.use("/pgtransfer", pgtransferRouter);
app.use("/recharge", rechargeRouter);
app.use("/bbps", bbpsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
