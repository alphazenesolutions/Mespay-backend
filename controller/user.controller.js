const models = require("../models");
const User = models.User;
const bcrypt = require("bcryptjs");
const secret = "4641316895";
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  try {
    const data = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    data["password"] = hash;
    data["merchant_ID"] = Math.floor(100000 + Math.random() * 900000);
    await User.findAll({
      where: { email: req.body.email, phone: req.body.phone },
    }).then(async (userdata) => {
      if (userdata.length === 0) {
        await User.create(data)
          .then(async (data) => {
            let token = jwt.sign({ id: data.id }, secret, {
              expiresIn: "24h",
            });
            await User.update(
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
    await User.findAll({
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

const Alluserdata = async (req, res) => {
  try {
    await User.findAll({
      attributes: {
        exclude: ["password", "token", "createdAt", "updatedAt"],
      },
      // where: { id: data },
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

    await User.update(value, {
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

    await User.destroy({ where: { id: data } })
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

    await User.findAll({ where: { email: email } })
      .then(async (data) => {
        if (data.length == 0) {
          res.json({
            status: 400,
            message: "Please Register...",
          });
        } else {
          if (data[0].status === "Active") {
            let passwordresult = await bcrypt.compare(
              password,
              data[0].password
            );
            if (passwordresult == true) {
              let token = jwt.sign({ id: data[0].id }, secret, {
                expiresIn: "24hr",
              });
              await User.update(
                { token: token },
                {
                  where: {
                    id: data[0].id,
                  },
                }
              );
              await User.findAll({
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
          } else {
            res.json({
              status: 400,
              message: "Your Account Not Active...",
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

    await User.update(value, {
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
    await User.findAll()
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
            res.send("Not Valid User..");
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

const CheckCode = async (req, res) => {
  try {
    const code = req.body.code;
    const id = req.body.id;
    await User.findAll({ where: { id: id } })
      .then(async (data) => {
        if (data.length == 0) {
          res.json({
            status: 400,
            message: "Please Register...",
          });
        } else {
          var checkuser = await data.filter((datanew) => {
            console.log(datanew.code, code, "datanew");
            return datanew.code == code;
          });
          if (checkuser.length !== 0) {
            res.send("Success");
          } else {
            res.send("Not Valid User..");
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

    await User.findAll({ where: { email: email, phone: phone } })
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
  Alluserdata,
  CheckCode,
};
