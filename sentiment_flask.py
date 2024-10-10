from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import sys

app = Flask(__name__)
CORS(app)  

model = joblib.load('sentiment_model.pkl')  
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/analyzeSentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    feedback = data['feedback']

    feedback_vectorized = preprocess_feedback(feedback)


    sentiment = model.predict(feedback_vectorized)
    sentiment_label = sentiment[0]
    print("inside function")
    print(type(feedback_vectorized))
    print(sentiment)
    sys.stdout.flush()
    return jsonify({'sentiment': sentiment_label})

def preprocess_feedback(feedback):
    feedback_vectorized = vectorizer.transform([feedback])
    
    return feedback_vectorized

if __name__ == '__main__':
    app.run(debug=True)
