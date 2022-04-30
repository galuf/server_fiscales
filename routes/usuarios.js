const upload = require('../libs/storage')
const { Router } = require("express");
const { postUser, getUser, getUsers, mostrarImage, updateUser } = require("../controllers/usuarios");
const router = Router();

router.post("/", upload.single('file') ,postUser);
router.get("/:id",getUser);
router.get("/",getUsers);
router.get("/foto/:id", mostrarImage);
router.put("/change", updateUser);

module.exports = router;