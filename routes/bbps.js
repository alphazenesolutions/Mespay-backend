var express = require("express");
var router = express.Router();

const bbpsController = require("../controller/bbps");

router.post("/getbbpscategories", bbpsController.getbbpscategories);
router.post("/cat-billers", bbpsController.catBillers);
router.post("/fetch-bill", bbpsController.fetchBill);
router.post("/create", bbpsController.create);
router.post("/payBill", bbpsController.payBill);
router.post("/viewAll", bbpsController.viewAll);

module.exports = router;
