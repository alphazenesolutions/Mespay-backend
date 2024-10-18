var express = require("express");
var router = express.Router();

const paymentlinkController = require("../controller/paymentlink.controller");

router.post("/create", paymentlinkController.create);
router.post("/viewByid", paymentlinkController.viewByid);
router.post("/update", paymentlinkController.update);
router.post("/destroy", paymentlinkController.destroy);
router.post("/viewByUser", paymentlinkController.viewByUser);
router.post("/viewByDate", paymentlinkController.viewByDate);
router.post("/viewAll", paymentlinkController.viewAll);
router.post("/viewByUserPending", paymentlinkController.viewByUserPending);
router.post("/viewByDateUser", paymentlinkController.viewByDateUser);
router.post("/checkuserpaymentlink", paymentlinkController.CheckUserPaymentLink);

module.exports = router;
