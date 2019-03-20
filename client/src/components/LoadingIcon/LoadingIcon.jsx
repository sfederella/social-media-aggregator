import React from 'react'

const LoadingIcon = (props) => {
  const {
    width = "1em",
    height = "1em"
  } = props;
  
  return (
    <div aria-hidden="true" className="loadingIcon">
      <span style={{width:width,height:height}} className="loadingDot"></span>
      <span style={{width:width,height:height}} className="loadingDot"></span>
      <span style={{width:width,height:height}} className="loadingDot"></span>
    </div>
  )
}

export default LoadingIcon