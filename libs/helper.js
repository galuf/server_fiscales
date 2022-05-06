const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const paginator = function (res, page, limit, search, sortBy, order = "desc") {
  const total = res.length;
  const paginas = parseInt(total / limit);

  if (order == "desc") {
    res.sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
  } else {
    res.sort((a, b) => {
      return a[sortBy] - b[sortBy];
    });
  }
  //console.log("resSort", res)
  const inicio = (page - 1) * limit;
  const final = page * limit > total ? total : page * limit;
  return {
    totalDocs: final  - inicio,
    hasNextPage: page >= paginas ? false : true,
    hasPrevPage: page == 1 ? false : true,
    page,
    result: res.slice(inicio, final),
  };
};

module.exports = {
  groupBy,
  paginator,
};
