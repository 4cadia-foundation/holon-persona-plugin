import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './Notfound.css';

class Notfound extends Component {

  render () {
    return (
      <div className="notfound">
        <h3 className="title">Sorry 😞</h3>
        <p className="paragraph">We don't found this page</p>
        <Link className="paragraph" to="/">Go back</Link>
      </div>
    );
  }

}

export default Notfound;