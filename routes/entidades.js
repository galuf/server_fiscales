const { Router } = require("express");
const {
  miembrosAcusadosEntidades,
  allAcusadosEntidades,
} = require("../controllers/acusadosEntidades");

const router = Router();

router.get("/", allAcusadosEntidades);
router.get("/miembros", miembrosAcusadosEntidades);

module.exports = router;
