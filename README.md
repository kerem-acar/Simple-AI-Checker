# Simple-AI-Checker
## Description
This project is a simple web application that takes in user text and determines how likely it is that the text was AI generated. The frontend of the project was built using the framework React + Vite with HTML, Tailwind/Vanilla CSS, and JavaScript. The backend was built using Python and Flask. In addition to this, the Google AI Studio API was used to determine the likelihood that the user text was AI generated. 
## Instructions 
### Installing Libraries
To run this project locally, first install the necessary libraries for the backend by running this command:
```
pip install -r requirements.txt
```
Make sure you are in the backend folder to do so, you can get there by running this command:
```
cd AI Checker\backend
```
Then, install the necessary libraries for the frontend by running these commands:
```
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx install tailwindcss init -p
```
Make sure to have Node.js installed, which will give you the npm package manager. You can go to the official Node.js website to do so. 
### Obtaining API Key
In order to run the AI part of this project, go to Google AI Studio and obtain an API key. Then, use that API key instead of the placeholder in get_result.py
### Running the Project
First initialize the database by running this command while in the backend folder:
```
py create_db.py
```
Then, to start running the backend server, use this command:
```
py main.py
```
Now, navigate to the frontend folder using this command:
```
cd ..\frontend
```
Initialize the frontend using this command:
```
npm run dev
```
