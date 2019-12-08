import React from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import './App.css';

class App extends React.Component {



  render(){
    return (
      <div className="App">
        <Navigation/>
         <Logo/>
         {/*
        <ImageLinkForm/>
        <FaceRecognition/> */}
        
      </div>
    );
  }
}

export default App;
