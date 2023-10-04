async function getFilteredResourceList(
    model,
    req,
    res,
    defaultSort,
    overrides
) {
    const { page = 1, limit = 10, ...query } = req.query;
    const skip = (parseInt(page) - 1) * limit;
    const filter =
        overrides && overrides.filter
            ? { ...query, ...overrides.filter }
            : { ...query };
    const sort = defaultSort;

    // console.log(`Initial query: \n`, query);
    // console.log(`Skip: ${skip}\nLimit: ${limit}`);
    // console.log('Filter: ', filter);

    const posts = await model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();

    if (posts) {
        // console.log(posts);
        const count = posts.length;
        const results = {
            total: count,
            pageLimit: limit,
            page: page,
            totalPages: Math.ceil(count / limit),
            posts: posts,
        };
        res.status(200).json(results);
    }
}

export default getFilteredResourceList;
