const { Router } = require("express");
const { sobrecarga, sobrecargaPag } = require("../controllers/funcionarios");

const router = Router();

router.get("/sobrecargaAll", sobrecarga);
router.get("/sobrecargados", sobrecargaPag);

module.exports = router;
