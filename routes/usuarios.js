const { Router } = require("express");
const {
  postUser,
  getUser,
  getUsers,
  mostrarImage,
  updateUser,
} = require("../controllers/usuarios");

const { miembrosAcusados } = require("../controllers/miembros");

const router = Router();

// router.get("/:id", getUser);
// router.get("/", getUsers);
// router.get("/foto/:id", mostrarImage);
// router.put("/change", updateUser);
router.get("/acusados", miembrosAcusados);

module.exports = router;
