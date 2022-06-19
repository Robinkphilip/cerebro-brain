import React from "react";

import Clarifai from "clarifai";

import "./App.css";
import ParticleBackground from "./components/config/ParticleBackground";
import Navigation from "./components/Navigation /Navigation";
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
    };
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      function(err) {
        console.log("calrifai", err);
      }
    );
  };
  render() {
    return (
      <div className="App">
        {/* <ParticleBackground /> */}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecogintion imgUrl={this.state.imgUrl} />
      </div>
    );
  }
}

export default App;
