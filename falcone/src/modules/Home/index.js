import React, { PureComponent } from "react";
import { connect } from "react-redux";
import LaunchDestination from "../LaunchDestination";
import loader from "../../assets/loader.gif";
import { setInitialValues } from "../../actions";
import "./index.css";
class Home extends PureComponent {
  componentDidMount() {
    this.props.setInitialValues();
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="home-container">
        {loading ? (
          // render loader until data is fetched
          <div className="loader-wrapper">
            <img src={loader} alt="loader" />
            Loading...
          </div>
        ) : (
          // render the main components
          <LaunchDestination />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  setInitialValues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
