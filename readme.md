# FraudGuard AI--

FraudGuard AI is a full-stack credit-card fraud detection application. It provides a React dashboard for submitting transactions and a FastAPI backend that uses a scikit-learn logistic regression model to classify transactions as legitimate or fraudulent.

## Features

- Analyze credit card transactions with `Time`, `Amount`, and PCA features `V1` through `V28`
- View prediction confidence and transaction results in the dashboard
- Dashboard, transaction history, and informational views
- Temporary signup and login flows
- FastAPI health check and interactive API documentation

## Project Structure

```text
.
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── ml/train_model.py       # Model training script
│   ├── model/                  # Generated model artifacts
│   ├── schemas/                # Pydantic request schemas
│   └── services/               # Authentication and prediction logic
└── frontend/
    ├── src/                    # React application
    ├── public/
    └── package.json
```

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer and npm
- A trained model at `backend/model/fraud_model.pkl`
- The training dataset at `backend/dataset/creditcard.csv` when retraining

The dataset and generated model are excluded from Git by `.gitignore`.

## Backend Setup

Open PowerShell in the repository root and run:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r reqirements.txt
uvicorn main:app --reload
```

The API will be available at:

- http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc
- Health check: http://127.0.0.1:8000/health

Run Uvicorn from the `backend` directory so the relative model path resolves correctly.

## Frontend Setup

In a second PowerShell window:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually http://localhost:5173.

Available frontend commands:

```powershell
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

The frontend currently calls the backend at `http://127.0.0.1:8000`. The backend CORS configuration allows the default Vite development origins.

## Retraining the Model

Place the dataset at `backend/dataset/creditcard.csv`, then run the training script from the repository root:

```powershell
cd backend
python ml\train_model.py
```

The script evaluates a logistic regression model and saves the result to `backend/model/fraud_model.pkl`.

## API Endpoints

| Method | Endpoint   | Description                                                |
| ------ | ---------- | ---------------------------------------------------------- |
| `GET`  | `/`        | API status                                                 |
| `GET`  | `/health`  | Reports API and model status                               |
| `POST` | `/signup`  | Temporarily accepts a new user registration                |
| `POST` | `/login`   | Temporarily accepts any valid email and non-empty password |
| `POST` | `/predict` | Classifies a transaction                                   |

### Prediction Request

`POST /predict` requires a JSON object containing `Time`, `Amount`, and all fields from `V1` to `V28`. Values must be numeric and `Amount` cannot be negative.

Example request shape:

```json
{
  "Time": 406.0,
  "V1": -1.35,
  "V2": 0.27,
  "V3": 1.77,
  "V4": 0.38,
  "V5": -0.5,
  "V6": 0.21,
  "V7": -0.12,
  "V8": 0.08,
  "V9": 0.32,
  "V10": -0.44,
  "V11": 0.71,
  "V12": -0.62,
  "V13": 0.17,
  "V14": -0.31,
  "V15": 0.42,
  "V16": -0.19,
  "V17": 0.11,
  "V18": 0.05,
  "V19": -0.07,
  "V20": 0.02,
  "V21": -0.03,
  "V22": 0.01,
  "V23": -0.02,
  "V24": 0.03,
  "V25": -0.01,
  "V26": 0.04,
  "V27": -0.02,
  "V28": 0.01,
  "Amount": 149.62
}
```

You can use the example payload from the Swagger UI to test the endpoint.

## Current Limitations

- Signup does not persist users.
- Login currently accepts any valid email and non-empty password and returns a sample token.
- Authentication is not suitable for production use until database storage, password hashing, and real token validation are implemented.
- Prediction requires the local model artifact; `/health` returns `503` when it is unavailable.

## License

No license has been specified for this project.
