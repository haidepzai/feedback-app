import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';
import { FeedbackProvider } from './context/FeedbackContext';

function App() {
 // const [feedback, setFeedback] = useState(FeedbackData) //App -> FeedbackList -> FeedbackItem
 //Nun mit Context

  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm 
                //handleAdd={addFeedback} 
                />
                <FeedbackStats 
                //feedback={feedback} 
                />
                <FeedbackList
                  //feedback={feedback}
                  //handleDelete={deleteFeedback} //Props-Drilling (App -> FeedbackList -> FeedbackItem)
                //Angular: Event-Binding : (handleDelete)="deleteFeedback($event)"
                />
              </>
            }>
            </Route>
            <Route path='/about' element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
