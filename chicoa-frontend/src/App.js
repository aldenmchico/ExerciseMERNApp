// Import React ES Modules
import { React, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';

function App() {

  // State variables / method that is used to share data between Home Page and Edit Page
  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>
        <div className="container">
          <header>
            <h1>Track Star</h1>
            <p className="headerDescription">Track Your Progress.</p>
          </header>

          <div className="navigation">
            <Navigation />
          </div>

          <main>
            <Route path="/" exact>
              <HomePage setExercise={setExercise}/>
            </Route>

            <Route path="/edit-exercise">
              <EditExercisePage exercise={exercise}/>
            </Route>
            
            <Route path="/create-exercise">
              <CreateExercisePage />
            </Route>
          </main>
        
          <footer>
            <p>&copy; 2022 Alden Chico</p>
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
