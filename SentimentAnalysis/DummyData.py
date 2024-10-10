import random
import pymongo

client = pymongo.MongoClient("mongodb://localhost:3001/")
db = client["feedbackDB"]
collection = db["feedback"]

positive_feedback = [
    "I love the work environment here.",
    "The benefits package is great!",
    "I feel valued by my team.",
    "The project is really interesting.",
    "I'm learning a lot from my manager."
]

negative_feedback = [
    "The workload is too much.",
    "I don't feel supported by my team.",
    "The benefits are lacking.",
    "This project is too stressful.",
    "I feel like I'm not growing in this role."
]

records = []
for _ in range(500):
    records.append({"feedback": random.choice(positive_feedback), "sentiment": "positive"})
for _ in range(500):
    records.append({"feedback": random.choice(negative_feedback), "sentiment": "negative"})

collection.insert_many(records)
print("Inserted 1000 dummy feedback records into MongoDB.")
