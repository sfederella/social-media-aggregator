import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { collect } from 'react-recollect';
import Button from "../../components/CustomButton/CustomButton.jsx";
import AuthService from "../../services/AuthService.jsx";

class LandingPage extends Component {
  constructor(props) {
    AuthService.checkOauthRedirect();
    if(AuthService.isLoggedIn()) {
      props.history.push('/dashboard');
    }
    
    super(props);
  }

  handleOnSingInClick = () => {
    AuthService.getOauthToken();
  }

  render() {
    return (
      <div className="landingPage">
        <Jumbotron>
          <div className="shadow">
            <h1>Social Media Aggregator</h1>
            <h2>
              Keep things <strong>organized</strong>. Never miss <strong>anything</strong>.
            </h2>
            <p>
              <Button
                fill
                bsStyle="primary"
                onClick={this.handleOnSingInClick}>
                <i className="fa fa-twitter"/>
                Sign in with Twitter
              </Button>
            </p>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default collect(LandingPage);
