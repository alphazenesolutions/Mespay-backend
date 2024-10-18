const models = require("../models");
const PaymentLink = models.PaymentLink;
var moment = require("moment");
const sequelize = models.sequelize;
const { Op } = require("sequelize");

const create = async (req, res) => {
  try {
    const data = req.body;
    await PaymentLink.create(data)
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
    await PaymentLink.findAll({ where: { id: data } })
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
    await PaymentLink.findAll({
      order: [["createdAt", "DESC"]],
      include: [models.User],
    })
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

const viewByDate = async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    await PaymentLink.findAll({ order: [["createdAt", "DESC"]] })
      .then((data) => {
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
    await PaymentLink.findAll({
      where: { user_id: req.body.id },
      order: [["createdAt", "DESC"]],
    })
      .then((data) => {
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

    await PaymentLink.findAll({
      where: { user_id: data },
      order: [["createdAt", "DESC"]],
    })
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

const viewByUserPending = async (req, res) => {
  try {
    const data = req.body.id;

    await PaymentLink.findAll({
      where: { user_id: data, status: "Pending" },
      order: [["createdAt", "DESC"]],
    })
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

const CheckUserPaymentLink = async (req, res) => {
  try {
    const userId = req.body.id;

    await PaymentLink.findAll({
      where: {
        user_id: userId,
        status: {
          [Op.or]: ["Pending", "Failed"],
        },
        [Op.and]: [
          {
            status: {
              [Op.ne]: "Success",
            },
          },
          {
            [Op.or]: [
              sequelize.where(
                sequelize.fn("DATE", sequelize.col("createdAt")),
                moment().format("YYYY-MM-DD")
              ),
            ],
          },
        ],
      },
      order: [["createdAt", "DESC"]],
      // limit: 1, // Limit the result to 1
    })
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

const update = async (req, res) => {
  try {
    const value = req.body;
    const id = req.body.id;

    await PaymentLink.update(value, {
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

    await PaymentLink.destroy({ where: { id: data } })
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

module.exports = {
  create,
  viewByid,
  update,
  destroy,
  viewByUser,
  viewByDate,
  viewAll,
  viewByUserPending,
  viewByDateUser,
  CheckUserPaymentLink,
};
