var express = require("express");
var router = express.Router();

const adminController = require("../controller/admin.controller");

router.post("/create", adminController.create);
router.post("/viewByid", adminController.viewByid);
router.post("/login", adminController.login);
router.post("/update", adminController.update);
router.post("/destroy", adminController.destroy);
router.post("/checkpassword", adminController.Checkpassword);
router.post("/updatepassword", adminController.updatePassword);
router.post("/checkuser", adminController.CheckUser);

module.exports = router;
