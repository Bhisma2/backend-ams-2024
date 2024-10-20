const express = require('express');
const Event = require('./src/schema/SchemaEvent');
const connectMongo = require('./src/database/ConnectMongo');
const corsMiddleware = require('./src/middleware/corsMiddleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

connectMongo();

app.use(express.json());
app.use(corsMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            code: 200,
            status: 'Success',
            message: 'Successfully retrieved events data!',
            data: events,
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            code: 500,
            status: 'Error',
            message: 'Failed to retrieve events data!',
        });
    }
});

app.post('/api/events', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            code: 400,
            status: 'Error',
            message: 'Title and description are required!',
        });
    }

    const event = new Event({ title, description });

    try {
        const savedEvent = await event.save();
        res.status(201).json({
            code: 201,
            status: 'Success',
            message: 'Successfully created event!',
            data: savedEvent,
        });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({
            code: 500,
            status: 'Error',
            message: 'Failed to create event!',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
