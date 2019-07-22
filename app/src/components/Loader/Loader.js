import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     loader: false
  //   }
  // }

  render () {
    return (
      <div className="loaderComponent">
        <div className="loaderBody">
          <div className="loader"></div>
          <p className="loaderText">Making your transaction...</p>
        </div>
      </div>
    )
  }

}

export default Loader;
