import { matchedData } from 'express-validator';

async function getFilteredResourceList(
    model,
    req,
    res,
    defaultSort,
    overrides
) {
    // TODO (later): When add query, add validate
    const { page = 1, limit = 2, ...query } = matchedData(req);

    // const { page = 1, limit = 10, ...query } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter =
        overrides && overrides.filter
            ? { ...query, ...overrides.filter }
            : { ...query };
    const sort = defaultSort;

    console.log(`Initial query: \n`, query);
    console.log(`Skip: ${skip}\nLimit: ${limit}`);
    console.log('Filter: ', filter);

    const items = await model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();

    if (items) {
        console.log(items);
        const count = await model.estimatedDocumentCount(filter);
        // const count = items.length;
        const results = {
            total: count,
            pageLimit: limit,
            page: page,
            totalPages: Math.ceil(count / parseInt(limit)),
            items: items,
        };
        res.status(200).json(results);
    }
}

export default getFilteredResourceList;
