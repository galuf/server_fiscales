const { Router } = require("express");
const {
  getMemberBySearch
} = require("../controllers/miembros");

const router = Router();

router.get("/", getMemberBySearch);

module.exports = router;
