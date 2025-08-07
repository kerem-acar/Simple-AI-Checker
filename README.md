# Simple-AI-Checker
## Description
This project is a simple web application that takes in user text and determines how likely it is that the text was AI generated. The frontend of the project was built using the framework React + Vite with HTML, Tailwind/Vanilla CSS, and JavaScript. The backend was built using Python and Flask. In addition to this, the Gemini API was used to determine the likelihood that the user text was AI generated. 
## Instructions 
### Installing Libraries
To run this project locally, create and activate a virtual environment in the backend directory and install the necessary libraries by running these commands:
```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```
Then, install the necessary libraries for the frontend in the frontend directory by first deactivating the virtual environment and running these commands:
```
deactivate
cd ..
cd frontend
npm install
```
Make sure to have Node.js installed before doing so, as it will give you the npm package manager. You can go to the official Node.js website to do so. 
### Obtaining API Key
In order to run the AI part of this project, go to Google AI Studio and obtain an API key. Then, use that API key instead of the placeholder in get_result.py file.
### Running the Project
First initialize the database by running this command while in the backend folder:
```
py create_db.py
```
Then, to start running the backend server, use this command:
```
py main.py
```
Now, navigate to the frontend folder using these commands:
```
cd ..
cd frontend
```
Initialize the frontend using this command:
```
npm run dev
```
