const models = require("../models");
const Distributor_transaction = models.Distributor_transaction;
var moment = require("moment");
const Distributor = models.Distributor;

const create = async (req, res) => {
  try {
    const data = req.body;
    await Distributor_transaction.create(data)
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
    await Distributor_transaction.findAll({ where: { id: data } })
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

const viewByorderid = async (req, res) => {
  try {
    const orderid = req.body.orderid;
    await Distributor_transaction.findAll({
      where: { orderid: orderid },
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

const viewAll = async (req, res) => {
  try {
    await Distributor_transaction.findAll()
      .then(async (data) => {
        if (data.length !== 0) {
          var finaldata = [];
          for (var i = 0; i < data.length; i++) {
            await Distributor.findAll({
              attributes: {
                exclude: ["password", "token", "createdAt", "updatedAt"],
              },
              where: { id: data[i].user_id },
              // where: { createdAt: { [Op.gte]: "2023-02-01" } },
              // order: [["createdAt", "DESC"]],
            }).then((userdata) => {
              console.log(userdata, "userdatadata");
              finaldata.push({
                transaction: data[i],
                user: userdata,
              });
            });
          }
          res.send(finaldata);
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

const viewByUser = async (req, res) => {
  try {
    const data = req.body.id;
    await Distributor_transaction.findAll({ where: { user_id: data } })
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

    await Distributor_transaction.update(value, {
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
    await Distributor_transaction.destroy({ where: { id: data } })
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
    await Distributor_transaction.findAll()
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
    await Distributor_transaction.findAll({ where: { user_id: req.body.id } })
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
  viewByorderid,
  viewByDateUser,
};
