export default function parseQuery(req, res, next) {
    // console.log('Starting new resource query')
    // console.log('Raw request.query: ', req.query);

    let { range, sort } = req.query;
    let { id, q, published, name, group, tags, ...filter } = JSON.parse(
        req.query.filter
    );
    // console.log('Other filters: ', filter);
    // if (range) {range = JSON.parse(req.query.range)}
    // if (sort)

    req.query = {
        ...req.query,
        filter: filter,
        range: range && JSON.parse(req.query.range),
        sort: sort && JSON.parse(req.query.sort),
        id: id,
        published: published,
        name: name,
        group: group,
        tags: tags,
        q: q,
    };
    // console.log('JSON-parsed req.query: ', req.query);

    next();
}
