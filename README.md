# People Data Labs Integration Project

This project provides a full-stack application that integrates with the People Data Labs API. It consists of a FastAPI backend for handling API requests and a React frontend for user interaction.

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8+
- Node.js 14+
- npm or yarn
- A People Data Labs API key
- Firebase App Environment variables 

## Project Structure

```
project/
├── backend/
│   ├── .env
│   ├── requirements.txt
│   └── main.py
└── frontend/
    ├── .env
    ├── .env.sample
    └── package.json
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Create a `.env` file and add your API key:
   ```
   API_KEY=your_people_data_labs_api_key_here
   ```
   > Note: Get your API key by signing up at [People Data Labs](https://www.peopledatalabs.com/)

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create a `.env` file using `.env.sample` as a template:
   ```bash
   cp .env.sample .env
   ```
   Update the environment variables as needed.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Environment Variables

### Backend
- `API_KEY`: Your People Data Labs API key


## Development

The backend server runs in development mode with auto-reload enabled. Any changes to the Python files will automatically restart the server.

The frontend development server also includes hot-reloading. Changes to React components will be immediately reflected in the browser.
