const { Router } = require("express");

const { postDenuncias } = require("../controllers/denuncias");

const router = Router();

router.get("/create", postDenuncias);

module.exports = router;
