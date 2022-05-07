const { db } = require("../database/config");

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const pagination = (query, options) => {
  return {
    docsQuery: `
      ${query}
      order by
	      ${options.sortBy}
      desc
      offset ${options.page * options.limit}
      limit ${options.limit}
    `,
    infoQuery: `
      with
        query_pagination as (
          ${query}
        )
          select
            count(*) total
          from 
            query_pagination
    `,
  };
};

const executePagination = async (query, options) => {
  const { docsQuery, infoQuery } = pagination(query, {
    ...options,
    page: options.page - 1,
  });

  const [[results], [[info]]] = await Promise.all([
    db.query(docsQuery),
    db.query(infoQuery),
  ]);

  return {
    info: {
      totalDocs: Number(info.total),
      limit: Number(options.limit ?? 15),
      page: options.page,
      totalPages: Math.ceil(info.total / Number(options.limit ?? 15)),
    },
    docs: results,
  };
};

const tilderize = (stringText) => stringText.replace(/[aeiouáéíóúnñ]/gi, (v) => {
  switch (v) {
    case 'a':
    case 'A':
    case 'á':
    case 'Á':
      return '(a|á)'
    case 'e':
    case 'é':
    case 'E':
    case 'É':
      return '(e|é)'
    case 'i':
    case 'í':
    case 'I':
    case 'Í':
      return '(i|í)'
    case 'o':
    case 'ó':
    case 'O':
    case 'Ó':
      return '(o|ó)'
    case 'u':
    case 'ú':
    case 'U':
    case 'Ú':
      return '(u|ú)'
    case 'n':
    case 'ñ':
    case 'N':
    case 'Ñ':
      return '(n|ñ)'
    default:
      return ''
  }
})

const escapeRegExp = (string) =>  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const createSearchRegexp = (text) => {
  const escapedText = tilderize(escapeRegExp(text))

  return escapedText
}

module.exports = {
  groupBy,
  executePagination,
  pagination,
  createSearchRegexp
};
