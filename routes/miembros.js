const { Router } = require("express");
const {
  getMemberBySearch,
  getMembersOrderedByNumCom,
  getMemberByDni
} = require("../controllers/miembros");

const router = Router();

router.get("/", getMemberBySearch);

router.get("/:dni", getMemberByDni);

router.get("/totalConvocatorias", getMembersOrderedByNumCom);
module.exports = router;
