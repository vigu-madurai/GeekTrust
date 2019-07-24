import React from "react";
import { connect } from "react-redux";

const Results = props => {
  const { results } = props;
  return <div>{results.status}</div>;
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
