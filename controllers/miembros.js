const { query } = require("../libs/query");
const { db } = require("../database/config");
const { executePagination } = require("../libs/pagination");

const getMemberBySearch = async (req, res) => {
  try {
    const page = req.query?.page ? Number(req.query.page) : 1;
    const limit = req.query?.limit ? Number(req.query.limit) : 15;
    const sortBy = req.query?.sortBy ? req.query.sortBy : "penal";
    const search = req.query?.search ? req.query.search : "";

    if(page <= 0) throw new Error("La página debe ser mayor a 0");
    if(limit <= 0) throw new Error("El limite debe ser mayor a 0");

    const { docs, info } = await executePagination(query.getMemberBySearch({
      sortBy,
      search
    }), {
      page,
      limit,
      sortBy,
    })

    res.json({
      success: true,
      data: {
        info,
        docs
      }
    })
  } catch (error) {
    console.log("Hubo un error: ", error);
    res.status(500).json({
      succes: false,
      msg: "Hable con el administrador",
    });
  }
}

module.exports = {
  getMemberBySearch,
};