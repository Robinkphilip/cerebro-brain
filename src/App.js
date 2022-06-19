import React from "react";
import Clarifai from "clarifai";

import "./App.css";
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
    };
  }
  onInputChange(event) {
    console.log(event.target.value);
  }
  onButtonSubmit() {
    console.log("click");
    app.models
      .predict(
        "9985cc1ce04d4266a60cc94602a6920e",
        "https://variety.com/wp-content/uploads/2019/11/tom-hanks-16x9.jpg"
      )
      .then(
        function(response) {
          console.log(response);
        },
        function(err) {}
      );
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecogintion />
      </div>
    );
  }
}

export default App;
