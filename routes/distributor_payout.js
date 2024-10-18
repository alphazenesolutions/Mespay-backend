var express = require("express");
var router = express.Router();
const distributor_payoutController = require("../controller/distributor_payout");

router.post("/create", distributor_payoutController.create);
router.post("/viewByid", distributor_payoutController.viewByid);
router.post("/update", distributor_payoutController.update);
router.post("/destroy", distributor_payoutController.destroy);
router.post("/viewByUser", distributor_payoutController.viewByUser);
router.post("/viewAll", distributor_payoutController.viewAll);

module.exports = router;
