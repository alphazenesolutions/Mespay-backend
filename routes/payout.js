var express = require("express");
var router = express.Router();
const axios = require("axios");
const FormData = require("form-data");
const payoutController = require("../controller/payout");

router.post("/create", payoutController.create);
router.post("/viewByid", payoutController.viewByid);
router.post("/update", payoutController.update);
router.post("/destroy", payoutController.destroy);
router.post("/viewByUser", payoutController.viewByUser);
router.post("/viewAll", payoutController.viewAll);

router.post("/transfer", function (req, res, next) {
  const {
    beneficiaryName,
    orderId,
    amount,
    beneficiaryAccountNumber,
    beneficiaryIfscCode,
    paymentMode,
    callbackurl,
    token,
    client_id,
  } = req.body;
  try {
    let data = new FormData();
    data.append("beneficiaryName", beneficiaryName);
    data.append("orderId", orderId);
    data.append("amount", amount);
    data.append("beneficiaryAccountNumber", beneficiaryAccountNumber);
    data.append("beneficiaryIfscCode", beneficiaryIfscCode);
    data.append("paymentMode", paymentMode);
    data.append("callbackurl", callbackurl);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://dev.api.payout.runpaisa.com/payment",
      url: "https://api.payout.runpaisa.com/payment",
      headers: {
        client_id: client_id,
        token: token,
        Cookie: "ci_session=327knagpo479872p81d8lmedao9ctjj2",
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.post("/status", function (req, res, next) {
  const { orderId, token, client_id } = req.body;
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://dev.api.payout.runpaisa.com/status",
      url: "https://api.payout.runpaisa.com/status",
      headers: {
        "Content-Type": "application/json",
        client_id: client_id,
        token: token,
        Cookie: "ci_session=327knagpo479872p81d8lmedao9ctjj2",
      },
      data: {
        order_id: orderId,
      },
    };
    axios
      .request(config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.post("/verify", function (req, res, next) {
  const { account, ifsc, token, client_id } = req.body;
  try {
    let data = new FormData();
    data.append("account", account);
    data.append("ifsc", ifsc);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.validate.runpaisa.com/account",
      headers: {
        "Content-Type": "multipart/form-data",
        client_id: client_id,
        token: token,
        Cookie: "ci_session=u437gs0s6d2rmgmvitojprofq59lprap",
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
