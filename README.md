# Voting System

A simple voting system built using Vite, React, and Chart.js with custom CSS styling. This project allows voters to cast their votes for candidates running for President, Governor, and Women Representative positions. It integrates a local API (`db.json`) using JSON Server to manage and store voting data.

## Features

- **User-friendly voting interface** with a controlled form.
- **Real-time vote counting and visualization** using bar charts.
- **Client-side routing** with React Router for Home, Vote, and Results pages.
- **Local API integration** using `db.json` for data storage.
- **Responsive design** with custom CSS using classes and IDs.

## Technologies Used

- **React**: Frontend framework for building the single-page application.
- **Vite**: Build tool for fast development and production builds.
- **CSS**: Custom styling with classes and IDs for responsive design.
- **React Router**: Client-side routing.
- **Chart.js**: Visualization of voting results.
- **JSON Server**: Local API for managing data.

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/JosephNgugi254/Voting-system
    ```

2. **Navigate to the project directory**:
    ```bash
    cd voting-system
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Install JSON Server globally if not already installed**:
    ```bash
    npm install -g json-server
    ```

5. **Start the JSON Server**:
    ```bash
    json-server --watch db.json
    ```

6. **Start the development server**:
    ```bash
    npm run dev
    ```

7. **Open the application** in your browser:
    ```
    http://localhost:5173
    ```

## How It Works

- The **Home page** provides a brief overview of the voting system.
- The **Vote page** allows users to:
  - Enter their voter details.
  - Select one candidate per position (President, Governor, Women Representative).
  - Submit their vote using a controlled form.
- Votes are sent to the `json-server` via POST and PATCH requests, and the state is updated to reflect the new vote counts.
- The **Results page** displays bar charts for each position, showing the current vote counts for all candidates.
- The application prevents duplicate voting by checking voter IDs and ensures one candidate selection per position.

## Project Structure

```
src/
├── components/
│   ├── Home.jsx: Displays the welcome message and system overview.
│   ├── VotingForm.jsx: Controlled form for casting votes.
│   ├── CandidateList.jsx: Displays candidates for each position.
│   ├── Results.jsx: Visualizes vote counts with Chart.js.
├── App.jsx: Main component with routing and state management.
├── main.jsx: Entry point for the React application.
styles.css: Custom CSS with classes and IDs for styling.
db.json: Local API data for voters and candidates.
vite.config.js: Vite configuration.
package.json: Project dependencies and scripts.
```

## License

This project is open-source and available under the [MIT License](LICENSE).
