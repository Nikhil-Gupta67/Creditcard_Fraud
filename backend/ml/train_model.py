import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# ==========================================
# 1. Load Dataset
# ==========================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

dataset_path = os.path.join(
    BASE_DIR,
    "dataset",
    "creditcard.csv"
)

df = pd.read_csv(dataset_path)

print("Dataset loaded successfully")
print("Shape:", df.shape)


# ==========================================
# 2. Separate Features and Target
# ==========================================

X = df.drop("Class", axis=1)
y = df["Class"]


# ==========================================
# 3. Train-Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training data:", X_train.shape)
print("Testing data:", X_test.shape)


# ==========================================
# 4. Train Logistic Regression
# ==========================================

model = LogisticRegression(
    C=1.0,
    max_iter=1000,
    solver="lbfgs"
)

model.fit(X_train, y_train)

print("Model training completed")


# ==========================================
# 5. Prediction
# ==========================================

y_pred = model.predict(X_test)


# ==========================================
# 6. Evaluation
# ==========================================

accuracy = accuracy_score(y_test, y_pred)

print("\nAccuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# ==========================================
# 7. Save Model
# ==========================================

model_dir = os.path.join(BASE_DIR, "model")

os.makedirs(model_dir, exist_ok=True)

model_path = os.path.join(
    model_dir,
    "fraud_model.pkl"
)

joblib.dump(model, model_path)

print("\nModel saved successfully:")
print(model_path)