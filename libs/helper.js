const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const paginator = function (res, page, limit, search, sortBy, order = "desc") {
  const total = res.lenght;
  const paginas = parseInt(total / limit);
  let resSort;
  if ((order = "asc")) {
    resSort = res.sort((a, b) => {
      Number(b[sortBy]) - Number(a[sortBy]);
    });
  } else {
    let resSort = res.sort((a, b) => {
      Number(a[sortBy]) - Number(b[sortBy]);
    });
  }
  const inicio = (page - 1) * limit;
  const final = page * limit > total ? total : page * limit;
  return {
    totalDocs: total,
    hasNextPage: page >= paginas ? false : true,
    hasPrevPage: page == 1 ? false : true,
    page,
    result: resSort.slice(inicio, final),
  };
};

module.exports = {
  groupBy,
  paginator,
};
