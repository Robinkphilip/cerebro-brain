import React from "react";
import Clarifai from "clarifai";

import "./App.css";
import Navigation from "./components/Navigation /Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

const app = new Clarifai.App({
  apiKey: "YOUR_API_KEY",
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
        {/* <FaceRecogintion /> */}
      </div>
    );
  }
}

export default App;
