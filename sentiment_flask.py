from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  

model = joblib.load('sentiment_model.pkl')  

@app.route('/analyzeSentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    feedback = data['feedback']

    feedback_vectorized = preprocess_feedback(feedback)

    sentiment = model.predict([feedback_vectorized])[0] 
    print(feedback_vectorized)

    return jsonify({'sentiment': sentiment})

def preprocess_feedback(feedback):
    
    return feedback  

if __name__ == '__main__':
    app.run(debug=True)
