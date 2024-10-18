var express = require("express");
var router = express.Router();
const distributor_transactionController = require("../controller/distributor_transaction");

router.post("/create", distributor_transactionController.create);
router.post("/viewByid", distributor_transactionController.viewByid);
router.post("/update", distributor_transactionController.update);
router.post("/destroy", distributor_transactionController.destroy);
router.post("/viewByUser", distributor_transactionController.viewByUser);
router.post("/viewAll", distributor_transactionController.viewAll);
router.post("/viewByDate", distributor_transactionController.viewByDate);
router.post("/viewByorderid", distributor_transactionController.viewByorderid);
router.post("/viewByDateUser", distributor_transactionController.viewByDateUser);

module.exports = router;
