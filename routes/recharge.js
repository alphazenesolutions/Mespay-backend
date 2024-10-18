var express = require("express");
var router = express.Router();

const rechargeController = require("../controller/recharge");

router.post("/oplist", rechargeController.oplist);
router.post("/circlelist", rechargeController.circlelist);
router.post("/fetchop", rechargeController.fetchop);
router.post("/create", rechargeController.create);
router.post("/dorecharge", rechargeController.dorecharge);
router.post("/viewAll", rechargeController.viewAll);
router.post("/planslist", rechargeController.planslist);


module.exports = router;