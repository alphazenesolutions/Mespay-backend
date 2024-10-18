var express = require("express");
var router = express.Router();
const axios = require("axios");
const FormData = require("form-data");

router.post("/cretetoken", function (req, res, next) {
  const { client_id, username, password } = req.body;
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://dev.api.runpaisa.com/token",
      url: "https://api.runpaisa.com/token",
      headers: {
        "Content-Type": "application/json",
        client_id: client_id,
        username: username,
        password: password,
        Cookie: "ci_session=hitg45mmrr7dv5q9lesr6dk9bbq5stas",
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

router.post("/creteorder", function (req, res, next) {
  const { amount, order_id, token, client_id } = req.body;

  try {
    let data = new FormData();
    data.append("callbackurl", "https://sampleurl.com/");
    data.append("order_id", order_id);
    data.append("amount", amount);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://test.api.pg.runpaisa.com/order",
      url: "https://api.pg.runpaisa.com/order",
      headers: {
        "Content-Type": "multipart/form-data",
        client_id: client_id,
        token: token,
        Cookie: "ci_session=4ia5s56043ss081t6f5rjmr1ovfe8gam",
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
  } catch (error) {}
});

router.post("/statusorder", function (req, res, next) {
  const { orderid, client_id, token } = req.body;
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://test.api.pg.runpaisa.com/status",
      url: "https://api.pg.runpaisa.com/status",

      headers: {
        "Content-Type": "application/json",
        client_id: client_id,
        token: token,
        Cookie: "ci_session=cg9oc34nt6ei51tc1cbtnspvttgkjt4u",
      },
      data: {
        order_id: orderid,
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

router.post("/getbalance", function (req, res, next) {
  const { client_id, token } = req.body;
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      // url: "https://dev.api.payout.runpaisa.com/getBalance",
      url: "https://api.payout.runpaisa.com/getBalance",

      headers: {
        client_id: client_id,
        "Content-Type": "application/json",
        token: token,
        Cookie: "ci_session=u9u7snuirtdei4d8t7u937d39r2julgo",
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

module.exports = router;
