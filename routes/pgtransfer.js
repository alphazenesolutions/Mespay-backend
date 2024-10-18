var express = require("express");
var router = express.Router();
const pgtransferController = require("../controller/pgtransfer");

router.post("/create", pgtransferController.create);
router.post("/viewByid", pgtransferController.viewByid);
router.post("/update", pgtransferController.update);
router.post("/destroy", pgtransferController.destroy);
router.post("/viewByUser", pgtransferController.viewByUser);
router.post("/viewAll", pgtransferController.viewAll);
router.post("/viewByDate", pgtransferController.viewByDate);
router.post("/viewByDateUser", pgtransferController.viewByDateUser);

module.exports = router;
