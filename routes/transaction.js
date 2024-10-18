var express = require("express");
var router = express.Router();
const transactionController = require("../controller/transaction");

router.post("/create", transactionController.create);
router.post("/viewByid", transactionController.viewByid);
router.post("/update", transactionController.update);
router.post("/destroy", transactionController.destroy);
router.post("/viewByUser", transactionController.viewByUser);
router.post("/viewAll", transactionController.viewAll);
router.post("/viewByDate", transactionController.viewByDate);
router.post("/viewByorderid", transactionController.viewByorderid);
router.post("/viewByDateUser", transactionController.viewByDateUser);

module.exports = router;
