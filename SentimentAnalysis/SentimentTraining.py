import pandas as pd
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load the JSON file
print("Loading JSON data...")
with open('feedback_data.json', 'r') as f:
    data = json.load(f)

# Convert the data into a Pandas DataFrame
df = pd.DataFrame(data)
print("Data loaded successfully.\n")

# Check the structure of the DataFrame
print("Here are the first few rows of the DataFrame:")
print(df.head())

# Check for missing values
print("\nChecking for missing values...")
print(df.isnull().sum())

# Checking the distribution of the sentiment labels
print("\nDistribution of sentiment labels:")
print(df['sentiment'].value_counts())

# Initializing the vectorizer
print("\nInitializing CountVectorizer...")
vectorizer = CountVectorizer()

# Fit and transform the 'feedback' column
print("Vectorizing feedback text data...")
X = vectorizer.fit_transform(df['feedback'])
print("Feedback text vectorized.")
print(f"Shape of the tokenized data: {X.shape}\n")

# Define the target variable (positive/negative sentiment)
y = df['sentiment']
print(f"Target variable (y) values:\n{y.value_counts()}\n")

# Split the data into training and testing sets
print("Splitting data into training and testing sets...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Training set size: {X_train.shape}, Testing set size: {X_test.shape}\n")

# Initialize the Naive Bayes model
print("Initializing the Multinomial Naive Bayes model...")
model = MultinomialNB()

# Train the model
print("Training the model...")
model.fit(X_train, y_train)
print("Model training completed.\n")

# Test the model
print("Making predictions on the test set...")
y_pred = model.predict(X_test)
print("Predictions completed.\n")

# Evaluate model performance
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save the trained model to a file
print("Saving the model as 'sentiment_model.pkl'...")
joblib.dump(model, 'sentiment_model.pkl')
print("Model saved.\n")

# Save the vectorizer as well (important for future predictions)
print("Saving the vectorizer as 'vectorizer.pkl'...")
joblib.dump(vectorizer, 'vectorizer.pkl')
print("Vectorizer saved.\n")
