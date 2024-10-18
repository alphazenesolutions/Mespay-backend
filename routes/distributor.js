var express = require("express");
var router = express.Router();

const distributorController = require("../controller/distributor");

router.post("/create", distributorController.create);
router.post("/viewByid", distributorController.viewByid);
router.post("/login", distributorController.login);
router.post("/update", distributorController.update);
router.post("/destroy", distributorController.destroy);
router.post("/checkpassword", distributorController.Checkpassword);
router.post("/updatepassword", distributorController.updatePassword);
router.post("/checkuser", distributorController.CheckDistributor);
router.get("/userdata", distributorController.AllDistributordata);

module.exports = router;
