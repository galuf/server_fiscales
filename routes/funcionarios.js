const { Router } = require("express");
const { sobrecarga } = require("../controllers/funcionarios");

const router = Router();

router.get("/sobrecargados", sobrecarga);

module.exports = router;
