import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          Copyright &copy; 2025 Vũ Văn Thăng.
          <br />
          Contact me for more information
        </p>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-hand-point-right"></i> Click me
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
