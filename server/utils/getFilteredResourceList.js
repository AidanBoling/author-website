import { matchedData } from 'express-validator';

async function getFilteredResourceList(
    model,
    imagePopPath,
    req,
    res,
    defaultSort,
    overrides
) {
    // [-] TODO (later): When add query, add validate
    console.log('Getting filtered list...');

    const { page = 1, limit = 10, ...query } = matchedData(req);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter =
        overrides && overrides.filter
            ? { ...query, ...overrides.filter }
            : { ...query };
    const sort = defaultSort;

    // console.log(`Query: \n`, query);
    // console.log(`Skip: ${skip}\nLimit: ${limit}`);
    // console.log('Filter: ', filter);

    const items = await model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(imagePopPath, 'url altText')
        .exec();

    if (items) {
        console.log('Found items: ', items.length);
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
