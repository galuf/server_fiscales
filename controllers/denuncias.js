const Denuncias = require("../models/denuncias");

const postDenuncias = async (req, res) => {
  const { body } = req;

  try {
    const denuncias = new Denuncias(body);
    await denuncias.save();

    res.json({
      success: true,
      denuncias,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  postDenuncias,
};
