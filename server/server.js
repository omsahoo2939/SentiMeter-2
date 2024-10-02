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

app.get('/api/films/:id/characters', async (req, res) => {
    const filmId = parseInt(req.params.id);

    try {
        const filmCharacters = await db.collection('films_characters').find({ film_id: filmId }).toArray();
        const characterIds = filmCharacters.map(fc => fc.character_id);
        const characters = await db.collection('characters').find({ id: { $in: characterIds } }).toArray();
        console.log(filmCharacters);
        res.json(characters);
    } catch (error) {
        console.error('Error fetching characters for film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/films/:id/planets', async (req, res) => {
    const filmId = parseInt(req.params.id);

    try {
        const filmPlanets = await db.collection('films_planets').find({ film_id: filmId }).toArray();
        const planetIds = filmPlanets.map(fc => fc.planet_id);
        const planets = await db.collection('planets').find({ id: { $in: planetIds } }).toArray();
        res.json(planets);
    } catch (error) {
        console.error('Error fetching characters for film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/characters/:id/films', async (req, res) => {
    const characterId = parseInt(req.params.id);

    try {
        const characterFilms = await db.collection('films_characters').find({ character_id: characterId }).toArray();
        const filmIds = characterFilms.map(fc => fc.film_id);
        const films = await db.collection('films').find({ id: { $in: filmIds } }).toArray();
        res.json(films);
    } catch (error) {
        console.error('Error fetching characters for film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/planets/:id/films', async (req, res) => {
    const planetsId = parseInt(req.params.id);

    try {
        const planetsFilms = await db.collection('films_planets').find({ planet_id: planetsId }).toArray();
        const filmIds = planetsFilms.map(fc => fc.film_id);
        const films = await db.collection('films').find({ id: { $in: filmIds } }).toArray();
        res.json(films);
    } catch (error) {
        console.error('Error fetching characters for film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/planets/:id/characters', async (req, res) => {
    const planetsId = parseInt(req.params.id);
    try {
        const planetsCharacter = await db.collection('planets').find({ id: planetsId }).toArray();
        const characterPlanet = planetsCharacter.map(fc => fc.id);
        const characters = await db.collection('characters').find({ homeworld: { $in: characterPlanet } }).toArray();
        res.json(characters);
       
    } catch (error) {
        console.error('Error fetching characters for film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
