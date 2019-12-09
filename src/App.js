import React from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:''
    }
  }

  onInputChange=(event)=>{
    // console.log(event.target.value)
    this.setState({
      input:event.target.value
    })

  }

  onSubmit=()=>{
    this.setState({
      imageUrl: this.state.input
    })
    console.log('submit')
  }

  render(){
    return (
      <div className="App">
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        onSubmit={this.onSubmit}
        onInputChange={this.onInputChange}/>

        <FaceRecognition imageUrl={this.state.imageUrl} /> 
        
      </div>
    );
  }
}

export default App;
