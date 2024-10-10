import random
import json

positive_feedback = [
    "I love the work environment here.",
    "The benefits package is great!",
    "I feel valued by my team.",
    "The project is really interesting.",
    "I'm learning a lot from my manager.",
    "I appreciate the team's collaboration.",
    "The office space is fantastic.",
    "I feel like my contributions are recognized.",
    "This company truly cares about its employees.",
    "The flexible work hours are amazing.",
    "The team spirit is exceptional.",
    "I feel motivated to come to work every day.",
    "I enjoy working with my colleagues.",
    "The training and development opportunities are great.",
    "I love the positive company culture.",
    "I’m growing professionally in this role.",
    "The leadership team is supportive.",
    "I feel empowered to share my ideas.",
    "The company’s mission aligns with my personal values.",
    "The perks, like free lunches and events, are awesome."
]

negative_feedback = [
    "The workload is too much.",
    "I don't feel supported by my team.",
    "The benefits are lacking.",
    "This project is too stressful.",
    "I feel like I'm not growing in this role.",
    "The work-life balance is terrible.",
    "The management doesn’t listen to feedback.",
    "There is a lack of career growth opportunities.",
    "I feel overworked and underappreciated.",
    "The company's communication is poor.",
    "There are too many unrealistic deadlines.",
    "I don’t feel valued for my hard work.",
    "The salary is not competitive.",
    "There’s no room for innovation here.",
    "The team morale is very low.",
    "I’m unhappy with the way conflicts are handled.",
    "The office environment is toxic.",
    "I feel like the company doesn’t care about employees.",
    "There’s no clear direction from leadership.",
    "The tools and technology we use are outdated."
]

records = []
for _ in range(500):
    records.append({"feedback": random.choice(positive_feedback), "sentiment": "positive"})
for _ in range(500):
    records.append({"feedback": random.choice(negative_feedback), "sentiment": "negative"})

with open('feedback_data.json', 'w') as file:
    json.dump(records, file, indent=4)

print("Saved 1000 dummy feedback records to 'feedback_data.json'.")
