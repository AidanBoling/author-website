import Event from '../model/Event.js';

async function sendResponse(model, dbCollection, data, res, code, filter = {}) {
    let count;
    if (Object.keys(filter).length) {
        count = await model.countDocuments(filter);
    } else {
        count = await model.estimatedDocumentCount(filter);
    }
    console.log('Found: ', count);
    res.set('Content-Range', `${dbCollection} 0-20/${count}`)
        .status(code)
        .send(data);
}

const eventController = {
    // Create an event
    create: async (req, res) => {
        const newEventData = req.body;
        // console.log('Book: ', newBookData);

        // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        // if (newEventData.datePublished) {
        //     newEventData.datePublished = req.body.datePublished + 'T12:00';
        // }

        try {
            const newEvent = await Event.create(newEventData);
            sendResponse(Event, 'events', newEvent, res, 201);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    // Get the list of events
    fetch: async (req, res) => {
        const queryFilter = JSON.parse(req.query.filter);
        const range = JSON.parse(req.query.range);
        const limit = range[1];
        const skip = range[0];

        try {
            const events = await Event.find(queryFilter).sort([
                JSON.parse(req.query.sort),
            ]);
            sendResponse(Event, 'events', events, res, 200, queryFilter);
        } catch (e) {
            console.log('Error getting events: ', error);
            response.status(500).send(e);
        }
    },

    // Get a single event
    get: async (req, res) => {
        try {
            const eventId = req.params.id;
            const event = await Event.findById(eventId);
            sendResponse(Event, 'events', event, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Update a book
    update: async (req, res) => {
        const eventId = req.params.id;
        let updates = { ...req.body, updatedAt: new Date() };
        // console.log('Updates:', updates);

        // // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        // if (req.body.datePublished && req.body.datePublished.length < 11) {
        //     updates.datePublished = req.body.datePublished + 'T12:00';
        // }

        try {
            const eventToUpdate = await Event.findByIdAndUpdate(
                eventId,
                updates
            );
            sendResponse(Event, 'events', { data: eventToUpdate }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Delete a book
    delete: async (req, res) => {
        try {
            const eventId = req.params.id;
            const eventToDelete = await Event.findById(eventId);
            await Event.findByIdAndDelete(eventId);
            sendResponse(Event, 'posts', { data: eventToDelete }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },
};

export default eventController;
