# AI Study Buddy

AI Study Buddy is an AI-powered web and mobile application designed to assist students in their learning process. It provides features like text summarization, topic explanations, and interactive study assistance using the Hugging Face API. The web app is built with React.js, the mobile app is developed using React Native, and the backend is written in Python.

## Features

- AI-powered text summarization
- Context-aware explanations
- Study session notes
- Interactive chatbot for study assistance
- Mobile and web compatibility
- User-friendly UI/UX

## Tech Stack

- **Frontend (Web):** React.js
- **Frontend (Mobile):** React Native (Expo)
- **Backend:** Python (FastAPI/Flask) with Hugging Face API integration
- **State Management:** React Context API / Redux (if needed)
- **Styling:** Tailwind CSS (Web) & React Native Styles (Mobile)
- **Deployment:** Vercel (Web), Expo Go (Mobile), Render/Heroku (Backend)

## Installation & Setup

### Web Application
1. Clone the repository:
   ```sh
   git clone https://github.com/royanikseresht/aistudybuddy.git
   ```
2. Navigate to the project folder:
   ```sh
   cd aistudybuddy/web
   ```
3. Install dependencies:
   ```sh
   yarn install
   ```
4. Create a `.env` file and add your Hugging Face API key:
   ```sh
   REACT_APP_HUGGINGFACE_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```sh
   yarn start
   ```

### Mobile Application
1. Navigate to the mobile app folder:
   ```sh
   cd aistudybuddy/mobile
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Create a `.env` file and add your Hugging Face API key:
   ```sh
   EXPO_PUBLIC_HUGGINGFACE_API_KEY=your_api_key_here
   ```
4. Start the Expo development server:
   ```sh
   npx expo start
   ```

### Backend (Python)
1. Navigate to the backend folder:
   ```sh
   cd aistudybuddy/backend
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Create a `.env` file and add your Hugging Face API key:
   ```sh
   HUGGINGFACE_API_KEY=your_api_key_here
   ```
5. Start the backend server:
   ```sh
   uvicorn main:app --reload  # If using FastAPI
   # or
   flask run  # If using Flask
   ```

## Usage
- Summarize study materials efficiently
- Get detailed explanations for various topics
- Save study notes for future reference
- Use the mobile version for on-the-go learning

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Make your changes and commit them
4. Push the changes and create a pull request

## License
This project is licensed under the Proprietary License. Unauthorized copying, modification, distribution, or use of this software, in part or in full, is strictly prohibited without explicit permission from the owner.

## Contact
For any questions or feedback, feel free to reach out:
- **Email:** rn211@student.london.ac.uk
- **GitHub:** [royanikseresht](https://github.com/royanikseresht)
