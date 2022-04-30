const path = require("path");
const fs = require("fs");
const { response } = require("express");
const Usuario = require("../models/usuario");
const MiembroCom = require("../models/miembrosCom");

const postUser = async (req, res = response) => {
  const { body } = req;

  try {
    const usuario = new Usuario({
      ...body,
      imagen: req.name ? `${req.name.split(".")[0]}` : "",
    });
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const updateUser = async (req, res) => {
  const { body } = req;
  try {
    await Usuario.update(
      { mostrar: 0 },
      {
        where: {
          id: body.id,
        },
      }
    );

    res.json({ msg: "Modificado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await Usuario.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `No existe el usuario con el ID: ${id}`,
    });
  }
};

const getUsers = async (req, res) => {
  const usuarios = await MiembroCom.findAll();

  res.json({ usuarios });
};

const mostrarImage = (req, res) => {
  const { id } = req.params;
  const pathImg = path.join(__dirname, "../storage/fotos", id + ".jpg");
  console.log(pathImg);
  if (fs.existsSync(pathImg)) {
    return res.sendFile(pathImg);
  }

  res.json({
    msg: "La imagen no se encuentra",
  });
};

module.exports = {
  getUser,
  getUsers,
  postUser,
  mostrarImage,
  updateUser,
};
