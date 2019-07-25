import React from "react";
import { connect } from "react-redux";
import { planetImgConstant } from "../../constants/image-constants";
import "./index.css";

const Results = props => {
  const {
    results: { status, planet_name }
  } = props;
  const renderResultData = () => {
    if (status === "success") {
      return {
        title1: "Hurray King Shan!",
        title2: `Its a great success, we found the Queen Al Falcone at ${planet_name}`,
        img: planetImgConstant[planet_name]
      };
    } else if (status === "false") {
      return {
        title1: "All our efforts wasted in vain!",
        title2:
          "King Shan! I am really sorry to say that we could not find the Queen Al Falcone"
      };
    } else {
      return {
        title1: "Err... Errr..",
        title2: "Technical Fault! Mission Failure! Please try again later..."
      };
    }
  };

  return <ResultTemplate result={renderResultData()} />;
};

const ResultTemplate = result => {
  const { title1, title2, img } = result.result;
  return (
    <div className="result-wrapper">
      <div className="title1">{title1}</div>
      <div className="title2">{title2}</div>
      {img && <img src={img} />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    results: state.results
  };
};

export default connect(
  mapStateToProps,
  null
)(Results);
