const models = require("../models");
const Admin = models.Admin;
const bcrypt = require("bcryptjs");
const secret = "4641316895";
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  try {
    const data = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    data["password"] = hash;
    await Admin.findAll({
      where: { email: req.body.email },
    }).then(async (userdata) => {
      if (userdata.length === 0) {
        await Admin.create(data)
          .then(async (data) => {
            let token = jwt.sign({ id: data.id }, secret, {
              expiresIn: "24h",
            });
            await Admin.update(
              { token: token },
              {
                where: {
                  id: data.id,
                },
              }
            )
              .then(() => {
                res.json({
                  status: 200,
                  message: "SUCCESS",
                  data: { id: data.id, token: token },
                });
              })
              .catch((err) => {
                console.log(err, "err");
                res.json({
                  status: 400,
                  message: err.message,
                });
              });
          })
          .catch((err) => {
            console.log(err, "err1");
            res.json({
              status: 400,
              message: err.message,
            });
          });
      } else {
        res.json({
          status: 400,
          message: "This email already has an account",
        });
      }
    });
  } catch (error) {
    console.log(error, "error");
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

const viewByid = async (req, res) => {
  try {
    const data = req.body.id;
    await Admin.findAll({
      attributes: {
        exclude: ["password", "token", "createdAt", "updatedAt"],
      },
      where: { id: data },
      // where: { createdAt: { [Op.gte]: "2023-02-01" } },
      // order: [["createdAt", "DESC"]],
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

    await Admin.update(value, {
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

    await Admin.destroy({ where: { id: data } })
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

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    await Admin.findAll({ where: { email: email } })
      .then(async (data) => {
        if (data.length == 0) {
          res.json({
            status: 400,
            message: "Please Register...",
          });
        } else {
          let passwordresult = await bcrypt.compare(password, data[0].password);
          if (passwordresult == true) {
            let token = jwt.sign({ id: data[0].id }, secret, {
              expiresIn: "24hr",
            });
            await Admin.update(
              { token: token },
              {
                where: {
                  id: data[0].id,
                },
              }
            );
            await Admin.findAll({
              attributes: { exclude: ["password"] },
              where: { email: email },
            }).then(async (userdata) => {
              res.json({
                status: 200,
                message: "SUCCESS",
                data: { token, userdata },
              });
            });
          } else {
            res.json({
              status: 400,
              message: "Wrong Password.. Please Check",
            });
          }
        }
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {}
};

const updatePassword = async (req, res) => {
  try {
    const value = req.body;
    const id = req.body.id;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    value["password"] = hash;

    await Admin.update(value, {
      where: {
        id: id,
      },
    })
      .then(() => {
        res.json({
          status: 200,
          message: "Updated Successfully",
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

const Checkpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Admin.findAll()
      .then(async (data) => {
        if (data.length == 0) {
          res.json({
            status: 400,
            message: "Please Register...",
          });
        } else {
          var checkuser = await data.filter((datanew) => {
            return datanew.email === email;
          });
          if (checkuser.length !== 0) {
            let passwordresult = await bcrypt.compare(
              password,
              checkuser[0].password
            );
            res.send(passwordresult);
          } else {
            res.send("Not Valid Admin..");
          }
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

const CheckUser = async (req, res) => {
  try {
    const email = req.body.email;
    const phone = req.body.phone;

    await Admin.findAll({ where: { email: email, phone: phone } })
      .then(async (data) => {
        if (data.length == 0) {
          res.json({
            status: 400,
            message: "Please Register...",
          });
        } else {
          res.json({
            status: 200,
            message: "SUCCESS",
            data: { data },
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {}
};

module.exports = {
  create,
  viewByid,
  update,
  destroy,
  login,
  Checkpassword,
  updatePassword,
  CheckUser,
};
