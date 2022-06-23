import React from "react";
import Clarifai from "clarifai";

import "./App.css";
import ParticleBackground from "./components/config/ParticleBackground";
import Navigation from "./components/Navigation /Navigation";
import Signin from "./components/Signin/Signin";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecogintion from "./components/FaceRecogintion/FaceRecogintion";

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
    console.log(box);
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
  render() {
    return (
      <div className="App">
        <ParticleBackground />
        <Navigation />
        <Signin />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecogintion imgUrl={this.state.imgUrl} box={this.state.box} />
      </div>
    );
  }
}

export default App;
