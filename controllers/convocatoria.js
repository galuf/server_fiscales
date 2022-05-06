const { query } = require("../libs/query");
const { db } = require("../database/config");

const acusacionesConvocatoria = async (req, res) => {
  try {
    const [results, metadata] = await db.query(
      query.porcentajeAcusadosConvocatoria
    );
    let frecuencias = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    results.forEach((e) => {
      let i = 1;
      while (i <= 10) {
        if (Number(e.porcentaje_acusados_100) <= i * 10) {
          frecuencias[i - 1] = frecuencias[i - 1] + 1;
          i = 1;
          break;
        }
        i += 1;
      }
    });
    res.json({
      success: true,
      results: frecuencias,
    });
  } catch (error) {
    console.log("Hubo un error: ", error);
    res.status(500).json({
      succes: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  acusacionesConvocatoria,
};
