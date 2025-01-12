## Running the Project Locally

### Prerequisites

1. **Node.js and npm**: Ensure you have Node.js and npm installed on your machine.
   - [Download Node.js](https://nodejs.org/)
2. **Git**: Ensure Git is installed for cloning the repository.
   - [Download Git](https://git-scm.com/)

---

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   - Create a `.env` file in the root of the project.
   - Add the following environment variable to your `.env` file:
     ```env
     REACT_APP_API_BASE_URL=http://localhost:5000/api
     ```
   - Replace `http://localhost:5000/api` with your actual backend API base URL if different.

4. **Start the Development Server**:
   Run the following command to start the React application:
   ```bash
   npm start
   ```

   By default, the app will run at `http://localhost:3000`.

5. **Backend (if applicable)**:
   - If the project requires a backend server, ensure it is running locally before starting the frontend.
   - For example:
     ```bash
     cd backend
     npm install
     npm run dev
     ```

---



### Common Issues and Solutions

1. **Missing `.env` File**:
   - Ensure the `.env` file is created in the root folder with the correct API URL.

2. **Port Conflicts**:
   - If port `3000` is already in use, specify another port using the `PORT` variable in `.env`:
     ```env
     PORT=3001
     ```

3. **Backend Not Running**:
   - If your API requests fail, ensure the backend server is up and running at the specified `REACT_APP_API_BASE_URL`.

---

### Scripts

- **Start Development Server**:
  ```bash
  npm start
  ```
- **Build for Production**:
  ```bash
  npm run build
  ``
