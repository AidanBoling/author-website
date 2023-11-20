import { matchedData } from 'express-validator';

export default async function getItemByValidatedId(
    model,
    req,
    res,
    populatePath
) {
    const { id } = matchedData(req);
    if (!id) throw new Error('Invalid params');

    const path = populatePath || 'image.fromDB';

    console.log('Validated id: ', id);
    const item = await model
        .findById(`${id}`)
        .populate(path, 'url altText caption dimensions orientation')
        .populate('tags', 'name')
        .exec();

    // console.log('Populated item: ', item);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Not Found' });
    }
}

// function populateImage(item) {
//     if (model === Book) {
//         //do this
//     } else {
//         //do this
//     }
// }
