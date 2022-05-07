const { Router } = require("express");
const {
  getMemberBySearch,
  getMembersOrderedByNumCom
} = require("../controllers/miembros");

const router = Router();

router.get("/", getMemberBySearch);
router.get("/totalConvocatorias", getMembersOrderedByNumCom);
module.exports = router;
