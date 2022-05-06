const { Router } = require("express");
const { acusacionesConvocatoria } = require("../controllers/convocatoria");

const router = Router();

router.get("/frecuenciaAcusacion", acusacionesConvocatoria);

module.exports = router;
