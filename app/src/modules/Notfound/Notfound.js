import React from 'react';
import { Link } from 'react-router-dom';

import './Notfound.css';

export default () => (
      <div className="notfound">
        <h3 className="title">Sorry 😞</h3>
        <p className="paragraph">We don't found this page</p>
        <Link className="paragraph" to="/">Go back</Link>
      </div>
);