import { matchedData } from 'express-validator';

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

export function formatAdminGetListQuery(request) {
    // const data = matchedData(request);
    // console.log('Validated data: ', data);

    let { range, sort, id, q, name, ...queryFilter } = matchedData(request);
    // console.log('Get-list queryFilter: ', queryFilter);

    let options = {};
    // let options = { sanitizeFilter: true };

    // if (range) {
    //     range = JSON.parse(range);
    //     // options = { ...options, limit: range[1], skip: range[0] };
    //     // const limit = range[1];
    //     // const skip = range[0];
    // }
    if (sort) {
        // sort = JSON.parse(request.query.sort);
        options = { ...options, sort: { [sort[0]]: sort[1] } };
        // console.log(options);
    }

    if (q) {
        queryFilter = { ...queryFilter, $text: { $search: q } };
    }

    if (name) {
        queryFilter = { ...queryFilter, name: name };
    }

    return { queryFilter, options };
}

export function handleGetItemsError(error, res) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
}
