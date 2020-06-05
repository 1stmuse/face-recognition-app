import React from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Clarifai from 'clarifai'
import SignIn from './components/signIn/SignIn'
import Register from './components/register/Register'
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
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        name:'',
        email:'',
        id:'',
        entries:0,
        joined: ''
      }
    }
  }

  loadUser=(data)=>{
    this.setState({
        user:{
          name:data.name,
          id:data._id,
          entries:data.entries,
          joined:data.joined
        }
    })
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width= Number(image.width)
    const height = Number(image.height)
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

  pload=(url)=>{
    this.setState({
      imageUrl:url,
      input:url
    })

  }

  onSubmit=()=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>{
      if(response){
        fetch('https://recog-backend.herokuapp.com/api/users/upload',{
          method:'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
              id:this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState({user:{
            ...this.state.user,
            entries:count
          }})
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
    this.setState({input: ''})
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }else if (route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({
      route:route
    })
  }

  render(){
    const {imageUrl, route, box}  = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { route==='home'
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
              onSubmit={this.onSubmit}
              pload={this.pload}/>

              <FaceRecognition imageUrl={imageUrl} box={box} /> 
            </div>
          :(
            route==='signin' ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }   
        
      </div>
    );
  }
}

export default App;
