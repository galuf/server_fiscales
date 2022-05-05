const { Router } = require("express");
const {
  miembrosAcusados,
  allAcusados,
} = require("../controllers/acusadosLugar");

const router = Router();

router.get("/", allAcusados);
router.get("/miembros", miembrosAcusados);

module.exports = router;
