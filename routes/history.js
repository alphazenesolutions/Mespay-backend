var express = require("express");
var router = express.Router();
const historyController = require("../controller/history");

router.post("/create", historyController.create);
router.post("/viewByid", historyController.viewByid);
router.post("/update", historyController.update);
router.post("/destroy", historyController.destroy);
router.post("/viewByUser", historyController.viewByUser);
router.post("/viewAll", historyController.viewAll);
router.post("/viewByDate", historyController.viewByDate);

module.exports = router;
