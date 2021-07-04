import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';

const particlesOptions = {
  "particles": {
    "number": {
      "value": 150,
      "density": {
        "enable": true,
        "value_area": 900
      }
    },
    "color": {
      "value": "#ffffff"
    }
  },
  "retina_detect": true
};


const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });

    fetch('https://boiling-mesa-34170.herokuapp.com/imageurl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://boiling-mesa-34170.herokuapp.com/image',
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log(err))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageURL, route, box, user } = this.state;

    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />

        {this.state.route === 'home'
          ? <>
            <Rank user={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageURL={imageURL} box={box} />
          </>
          :
          route === 'signin' || route === 'signout' ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    );
  }
}

export default App;