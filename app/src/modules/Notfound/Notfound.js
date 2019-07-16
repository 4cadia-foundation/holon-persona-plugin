import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Notfound.css';


class Notfound extends Component {


  render () {
    return (
      <div className="notfound">
        <h3>Sorry ;)</h3>
        <p>Page not found</p>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

}

export default Notfound;