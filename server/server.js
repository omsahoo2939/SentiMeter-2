import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'sentimeter';
let db;

MongoClient.connect(mongoURI)
    .then(client => {
        console.log('MongoDB connected');
        db = client.db(dbName);
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/employees', async (req, res) => {
    try {
        const employees = await db.collection('employees').find().toArray();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/feedbacks', async (req, res) => {
    try {
        const feedbacks = await db.collection('feedbacks').find().toArray();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// app.get('/api/submitForm', async (req, res) => {
//     try {
//         const employees = await db.collection('employees').find().toArray();
//         res.json(employees);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
