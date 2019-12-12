import React from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Clarifai from 'clarifai'
import './App.css';





const app = new Clarifai.App({
  apiKey: 'e76a34d331c24ef7b620b19d58423eac'
 });
 

class App extends React.Component {

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width= Number(image.width)
    const height = Number(image.height)
    console.log(width, height)
    return{
      leftCol:clarifaiFace.left_col* width,
      topRow:clarifaiFace.top_row * height,
      rightCol: width-(clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row *height)

    }
  }


  displayFaceBox=(box)=>{
    this.setState({box:box})
  }

  onInputChange=(event)=>{
    // console.log(event.target.value)
    this.setState({
      input:event.target.value
    })

  }

  onSubmit=()=>{
    this.setState({
      imageUrl:this.state.input
    })

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err=>console.log(err));
    this.state.input=''
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

        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} /> 
        
      </div>
    );
  }
}

export default App;
