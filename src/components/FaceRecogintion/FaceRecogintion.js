import React from "react";

import "./FaceRecogintion.css";

const FaceRecogintion = ({ imgUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="input-image" src={imgUrl} alt="" width="500px" height="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol,
          }}
        ></div>
      </div>
    </div>
  );
};
export default FaceRecogintion;
