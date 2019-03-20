import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

class CustomDivButton extends Component {
  render() {
    const { fill, simple, pullRight, round, 
            block, bsStyle, ml, mr, className, ...rest } = this.props;

    const btnClasses = cx({
      "btn-fill": fill,
      "btn-simple": simple,
      "pull-right": pullRight,
      "btn-block": block,
      "btn-round": round,
      "btn-ml": ml,
      "btn-mr": mr,
      "btn-danger": bsStyle === "danger",
      "btn-info": bsStyle === "info",
      "btn-warning": bsStyle === "warning",
      "btn-success": bsStyle === "success",
      "btn-default": bsStyle === "default"
    });

    return <div className={`btn ${btnClasses} ${className}`} {...rest} />;
  }
}

CustomDivButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool
};

export default CustomDivButton;
