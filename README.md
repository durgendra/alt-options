# Alt Options

Housing and document-processing demo with two React client snapshots, an Express backend, and a Python PDF extraction sidecar.

## About

The repository appears to combine a room-listing style React application with supporting server code and a separate Flask/PDF extraction utility. The workspace also contains a gitleaks report, which suggests the repo has already been scanned for publication risk.

## Key Features

- Room and summary routes on the Node backend
- Firebase, Mapbox, and Google sign-in on the client
- PDF extraction helper under `server_flask/`
- Separate client snapshot in `client copy/`

## Architecture

- `client/` and `client copy/` are two near-duplicate React frontends
- `server/` is the Express backend
- `server_flask/` contains a PDF extraction utility and vendored helper library code

## Tech Stack

- React 18
- Create React App
- Node.js + Express
- MongoDB + Mongoose
- Python + Flask
- Mapbox / Firebase / Google auth

## Prerequisites

- Node.js
- Python 3.x
- MongoDB

## Installation

```bash
cd server && npm install
cd ../client && npm install
cd ../server_flask && pip install -r requirements.txt
```

## Configuration

- Server: `PORT`, `CLIENT_URL`, `MONGO_CONNECT`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`
- Client: `REACT_APP_SERVER_URL`, `REACT_APP_MAP_TOKEN`, `REACT_APP_API_KEY`, `REACT_APP_AUTH_DOMAIN`, `REACT_APP_PROJECT_ID`, `REACT_APP_STORAGE_BUCKET`, `REACT_APP_MESSAGING_SENDER`, `REACT_APP_APP_ID`, `REACT_APP_GOOGLE_CLIENT_ID`

## How to Run

```bash
cd server
npm start

cd ../client
npm start
```

The Flask sidecar exposes a Flask `app` object in `server_flask/app.py`; start it with the Flask CLI or your preferred runner if needed.

## Example Usage

- Browse the room management UI
- Trigger the PDF extraction helper for document ingestion workflows

## Project Structure

- `client/src/` - React UI
- `client copy/src/` - alternate React UI snapshot
- `server/routes/` - room and user APIs
- `server_flask/PDFDataExtractor/` - vendored helper package

## Current Status

Needs publication cleanup. The repository still includes duplicate client snapshots and a gitleaks report.

## Limitations

- Sensitive report artifacts are present
- No root env example
- No explicit license at the repo root

## License

No explicit license file was found at the repository root.
