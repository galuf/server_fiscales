const { Router } = require("express");

const { postDenuncias } = require("../controllers/denuncias");

const router = Router();

router.post("/create", postDenuncias);

module.exports = router;
