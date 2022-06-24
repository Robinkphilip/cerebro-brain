import React from "react";
import Clarifai from "clarifai";

import "./App.css";

import Navigation from "./components/Navigation /Navigation";
import Signin from "./components/Signin/Signin";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecogintion from "./components/FaceRecogintion/FaceRecogintion";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
  apiKey: "9985cc1ce04d4266a60cc94602a6920e",
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  calculateLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceLoction = (box) => {
    this.setState({ box: box });
  };
  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceLoction(this.calculateLocation(response)).catch((err) =>
          console.log(err)
        )
      );
  };
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: "false" });
    } else if (route === "home") {
      this.setState({ isSignedIn: "true" });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imgUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecogintion imgUrl={imgUrl} box={box} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
