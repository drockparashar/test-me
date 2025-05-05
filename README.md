# Test Me

**Test Me** is an AI-powered personalized learning platform designed to help students practice and improve their knowledge through dynamic tests and performance analytics. It leverages modern web technologies and AI to create an engaging and adaptive educational experience.

---

## Demo Video

Watch the demo video to see Test Me in action:

[![Test Me Demo](https://img.youtube.com/vi/JwP94xQlA8I/0.jpg)](https://www.youtube.com/watch?v=JwP94xQlA8I)

---

## Features

### 1. **AI-Generated Questions**

- Dynamically generates multiple-choice questions based on the selected class, subject, difficulty, and question count.
- Uses the **Gemini API** for AI-powered question generation.

### 2. **User Authentication**

- Secure user authentication using **JWT (JSON Web Token)**.
- Passwords are hashed using **bcrypt.js** for security.

### 3. **Test Management**

- Users can configure tests by selecting parameters like class, subject, difficulty, and duration.
- Tracks answers, time taken, and question-level details during the test.

### 4. **Performance Analytics**

- Provides detailed insights into user performance, including:
  - Topic-wise strengths and weaknesses.
  - Average time per question.
  - Accuracy and overall performance rating.
- Displays test history and trends using **Recharts**.

### 5. **Modern User Interface**

- Built with **React**, **TypeScript**, and **TailwindCSS** for a responsive and user-friendly experience.
- Includes features like a dashboard, test environment, and analysis page.

---

## Technologies Used

### **Frontend**

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **TailwindCSS**: For styling and responsive design.
- **Recharts**: For data visualization.
- **React Router**: For client-side routing.

### **Backend**

- **Node.js**: For building the server-side application.
- **Express.js**: For creating RESTful APIs.
- **MongoDB**: For storing user data and test results.
- **Mongoose**: For object data modeling (ODM) with MongoDB.

### **Authentication**

- **JWT (JSON Web Token)**: For secure user authentication.
- **bcrypt.js**: For hashing passwords.

### **AI Integration**

- **Gemini API**: For generating AI-powered multiple-choice questions.

### **Development Tools**

- **Vite**: For fast development and build tooling.
- **ESLint**: For linting and maintaining code quality.
- **Nodemon**: For automatic server restarts during development.

---

## Installation and Setup

### Prerequisites

- **Node.js** and **npm** installed on your system.
- A **MongoDB** instance (local or cloud-based).
- A valid **Gemini API Key**.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd test-me
```

### 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
GEMINI_API_KEY=<your_gemini_api_key>
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### 4. Start the Application

#### Backend

```bash
cd server
npm start
```

#### Frontend

```bash
cd ../client
npm run dev
```

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`.

---

## Project Structure

### **Backend**

- `server.js`: Entry point for the backend server.
- `src/`
  - `controllers/`: Contains logic for handling API requests.
  - `models/`: Defines MongoDB schemas for users and test results.
  - `routes/`: Defines API endpoints.
  - `services/`: Contains the Gemini API integration.
  - `middlewares/`: Includes authentication middleware.

### **Frontend**

- `src/`
  - `pages/`: Contains React components for different pages (e.g., Dashboard, Test, Analysis).
  - `components/`: Reusable UI components (e.g., Timer, QuestionGrid).
  - `App.tsx`: Main application entry point.
  - `index.css`: Global styles.

---

## Key Endpoints

### **Backend API**

- **Authentication**
  - `POST /auth/signup`: Register a new user.
  - `POST /auth/login`: Log in an existing user.
- **Questions**
  - `POST /questions/generate-questions`: Generate AI-powered questions.
- **Tests**
  - `POST /test/submit-test`: Submit test results.
  - `GET /test/getTestResult/:testId`: Fetch detailed test results.
- **Users**
  - `GET /user/getUserData/:id`: Fetch user data and test history.

---

## Future Enhancements

- Add support for more question types (e.g., fill-in-the-blank, true/false).
- Implement gamification features like badges and leaderboards.
- Add support for multi-language questions.
- Enhance AI question generation with more advanced models.

---
