import React, { Component } from "react";
import Dotdotdot from 'react-dotdotdot'
import { Col } from "react-bootstrap";
export class TweetCard extends Component {
  
  render() {
    const {
      data = {},
      ...rest
    } = this.props

    const classArr = ["card","tweet"];
    if(data.animated) classArr.push("animated");

    return (
      <Col {...rest}>
        <div className={classArr.join(" ")}>
          <img className="profileImage" src={data.imageUrl} alt={data.username}/>
          <div className="content">
            <div className="header">
              <strong className="name">
                {data.name}
              </strong>
              <span className="username">
                @{data.username}
              </span>
            </div>
            <hr/>
            <div className="message">
              <Dotdotdot clamp={4}>
                <p>{data.message}</p>
              </Dotdotdot>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default TweetCard;
