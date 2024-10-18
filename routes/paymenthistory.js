var express = require("express");
var router = express.Router();
const paymenthistoryController = require("../controller/paymenthistory");

router.post("/create", paymenthistoryController.create);
router.post("/viewByid", paymenthistoryController.viewByid);
router.post("/update", paymenthistoryController.update);
router.post("/destroy", paymenthistoryController.destroy);
router.post("/viewByUser", paymenthistoryController.viewByUser);
router.post("/viewAll", paymenthistoryController.viewAll);
router.post("/checkByUser", paymenthistoryController.checkByUser);

module.exports = router;
