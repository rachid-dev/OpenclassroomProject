import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Survey from './pages/Survey';
import Header from './components/Header';
import Error from './components/Error';
import Results from './pages/Results';
import Freelances from './pages/Freelances';
import GlobalStyle from './utils/style/GlobalStyle';
import {ThemeProvider} from './utils/context'
import Footer from './components/Footer'
import {SurveyProvider} from './utils/context'
import Profile from './pages/Profile'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <GlobalStyle/>
        <Header/>
        <SurveyProvider>
        <Routes>
          <Route path='/' element ={<Home />}/>         
          <Route path='/survey/:questionNumber' element ={<Survey />}/>
          <Route path ='/results' element ={<Results />} />
          <Route path ='/freelances' element ={<Freelances />} />
          <Route path='/profile/:id'  element= {<Profile />} />
          <Route path='*' element={<Error />}/>
        </Routes>
        </SurveyProvider>
        <Footer/>
      </ThemeProvider>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
