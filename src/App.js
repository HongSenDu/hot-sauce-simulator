import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Learn from './containers/Learn';
import Quiz from './containers/Quiz';
import EndQuiz from './containers/EndQuiz';
import Tutorial from './containers/Tutorial';

function App() {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/tutorial' component={Tutorial} />
        <Route path='/learn' component={Learn} />
        <Route exact path='/quiz'>
          <Quiz correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} />
        </Route>
        <Route exact path='/quiz-end'>
          <EndQuiz correctAnswers={correctAnswers} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
