const { db } = require("../database/config")

const pagination = (query, options) => {
  return {
    docsQuery: `
      ${query}
      order by
	      total_${options.sortBy}
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
    `
  }
}

const executePagination = async (query, options) => {
  const { docsQuery, infoQuery } = pagination(
    query,
    {
      ...options,
      page: options.page - 1,
    }
  )

  const [[results], [[info]]] = await Promise.all([
    db.query(docsQuery),
    db.query(infoQuery)
  ]);

  return {
    info: {
      totalDocs: Number(info.total),
      limit: Number(options.limit ?? 15),
      page: options.page,
      totalPages: Math.ceil(info.total / Number(options.limit ?? 15)),
    },
    docs: results
  }
}

module.exports = {
  executePagination,
  pagination
}