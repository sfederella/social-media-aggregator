import React, { Component } from "react";
export class SubjectCard extends Component {
  
  render() {
    const {
      data = {},
      onClick
    } = this.props

    return (
      <div className="node">
          #{data}
          <i 
            className="pe-7s-close"
            onClick={onClick}
          />
      </div>
    );
  }
}

export default SubjectCard;
