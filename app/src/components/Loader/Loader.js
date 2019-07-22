import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {

  render () {
    return (
      <div>
        <div className="loader-body">
          <div className="loader"></div>
        </div>
      </div>
    )
  }

}

export default Loader;
