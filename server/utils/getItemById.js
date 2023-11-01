import { matchedData } from 'express-validator';

export default async function getItemByValidatedId(
    model,
    req,
    res,
    returnItem = false
) {
    const { id } = matchedData(req);
    if (!id) throw new Error('Invalid params');

    console.log('Validated id: ', id);
    const item = await model.findById(`${id}`);

    if (returnItem) return item;

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Not Found' });
    }
}
