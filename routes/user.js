var express = require("express");
var router = express.Router();

const userController = require("../controller/user.controller");

router.post("/create", userController.create);
router.post("/viewByid", userController.viewByid);
router.post("/login", userController.login);
router.post("/update", userController.update);
router.post("/destroy", userController.destroy);
router.post("/checkpassword", userController.Checkpassword);
router.post("/updatepassword", userController.updatePassword);
router.post("/checkuser", userController.CheckUser);
router.get("/userdata", userController.Alluserdata);
router.post("/checkcode", userController.CheckCode);

module.exports = router;
