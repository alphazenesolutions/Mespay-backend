const models = require("../models");
const WalletCredit = models.WalletCredit;
var moment = require("moment");

const create = async (req, res) => {
  try {
    const data = req.body;
    await WalletCredit.create(data)
      .then((data) => {
        res.json({
          status: 200,
          message: "SUCCESS",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const viewByid = async (req, res) => {
  try {
    const data = req.body.id;
    await WalletCredit.findAll({ where: { id: data } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};


const viewAll = async (req, res) => {
  try {
    await WalletCredit.findAll({
      order: [["createdAt", "DESC"]],
      include: [models.User],
    })
      .then(async (data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const viewByUser = async (req, res) => {
  try {
    const data = req.body.id;
    await WalletCredit.findAll({
      where: { user_id: data },
      order: [["createdAt", "DESC"]],
    })
      .then(async (data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const value = req.body;
    const id = req.body.id;

    await WalletCredit.update(value, {
      where: {
        id: id,
      },
    })
      .then(() => {
        res.send("Updated Successfully");
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const data = req.body.id;
    await WalletCredit.destroy({ where: { id: data } })
      .then(() => {
        res.send("Deleted Successfully");
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const viewByDate = async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    await WalletCredit.findAll({
      order: [["createdAt", "DESC"]],
      include: [models.User],
    })
      .then(async (data) => {
        if (data.length !== 0) {
          var filterdata = [];
          for (var i = 0; i < data.length; i++) {
            if (
              moment(data[i].createdAt).format("YYYY-MM-DD") >= from &&
              moment(data[i].createdAt).format("YYYY-MM-DD") <= to
            ) {
              filterdata.push(data[i]);
            }
          }
          res.send(filterdata);
        } else {
          res.send([]);
        }
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const viewByDateUser = async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    await WalletCredit.findAll(
      { where: { user_id: req.body.id }, order: [["createdAt", "DESC"]] },
      { include: [models.User] }
    )
      .then(async (data) => {
        if (data.length !== 0) {
          var filterdata = [];
          for (var i = 0; i < data.length; i++) {
            if (
              moment(data[i].createdAt).format("YYYY-MM-DD") >= from &&
              moment(data[i].createdAt).format("YYYY-MM-DD") <= to
            ) {
              filterdata.push(data[i]);
            }
          }
          res.send(filterdata);
        } else {
          res.send([]);
        }
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  viewByid,
  update,
  destroy,
  viewByUser,
  viewAll,
  viewByDate,
  viewByDateUser,
};
