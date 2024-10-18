var express = require("express");
var router = express.Router();
const walletdebitController = require("../controller/walletdebit");

router.post("/create", walletdebitController.create);
router.post("/viewByid", walletdebitController.viewByid);
router.post("/update", walletdebitController.update);
router.post("/destroy", walletdebitController.destroy);
router.post("/viewByUser", walletdebitController.viewByUser);
router.post("/viewAll", walletdebitController.viewAll);
router.post("/viewByDate", walletdebitController.viewByDate);
router.post("/viewByDateUser", walletdebitController.viewByDateUser);

module.exports = router;
