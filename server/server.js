import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';

const app = express();
const port = 3101;

app.use(express.json());

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'swapi';
let db;

MongoClient.connect(mongoURI)
    .then(client => {
        console.log('MongoDB connected');
        db = client.db(dbName);
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/characters', async (req, res) => {
    try {
        const characters = await db.collection('characters').find().toArray();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const films = await db.collection('films').find().toArray();
        res.json(films);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const planets = await db.collection('planets').find().toArray();
        res.json(planets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const character_id = parseInt(req.params.id);
        const character = await db.collection('characters').findOne({ id: character_id });
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const planet_id = parseInt(req.params.id);
        const planets = await db.collection('planets').findOne({ id: planet_id });
        if (!planets) {
            return res.status(404).json({ error: 'Planets not found' });
        }
        res.json(planets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const film_id = parseInt(req.params.id);
        const films = await db.collection('films').findOne({ id: film_id });
        if (!films) {
            return res.status(404).json({ error: 'Films not found' });
        }
        res.json(films);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
