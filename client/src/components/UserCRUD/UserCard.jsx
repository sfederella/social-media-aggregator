import React, { Component } from "react";
export class UserCard extends Component {
  
  render() {
    const {
      data = {},
      onClick
    } = this.props

    return (
      <div className="node">
        <strong className="name">
          {data.name}
        </strong>
        <span className="username">
          @{data.username}
        </span>
        <i 
          className="pe-7s-close"
          onClick={onClick}
        />
      </div>
    );
  }
}

export default UserCard;
