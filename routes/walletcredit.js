var express = require("express");
var router = express.Router();
const walletcreditController = require("../controller/walletcredit");

router.post("/create", walletcreditController.create);
router.post("/viewByid", walletcreditController.viewByid);
router.post("/update", walletcreditController.update);
router.post("/destroy", walletcreditController.destroy);
router.post("/viewByUser", walletcreditController.viewByUser);
router.post("/viewAll", walletcreditController.viewAll);
router.post("/viewByDate", walletcreditController.viewByDate);
router.post("/viewByDateUser", walletcreditController.viewByDateUser);

module.exports = router;
