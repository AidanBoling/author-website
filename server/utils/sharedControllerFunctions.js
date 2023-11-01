export async function sendResponse(
    model,
    dbCollection,
    data,
    res,
    code,
    filter = {}
) {
    let count;
    if (Object.keys(filter).length) {
        count = await model.countDocuments(filter);
    } else {
        count = await model.estimatedDocumentCount(filter);
    }
    console.log(`${dbCollection} found: `, count);

    res.set('Content-Range', `${dbCollection} 0-20/${count}`)
        .status(code)
        .send(data);
}

export function transformAdminGetList(request) {
    console.log(request.query);
    let { filter, range, sort } = request.query;
    const { id, ...queryFilter } = JSON.parse(filter);
    // console.log(id);
    // console.log(queryFilter);
    // console.log(sort);
    let options = {};
    if (range) {
        range = JSON.parse(range);
        // options = { ...options, limit: range[1], skip: range[0] };
        // const limit = range[1];
        // const skip = range[0];
    }
    if (sort) {
        sort = JSON.parse(request.query.sort);
        options = { ...options, sort: { [sort[0]]: sort[1] } };
        // console.log(options);
    }

    return { queryFilter, options };
}

export function handleGetItemsError(error, res) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
}
