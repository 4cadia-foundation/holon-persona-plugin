import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import './CloseIconPage.css';

class CloseIconPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type="button" className="closeButton" aria-label="Close" >
        <Link to={ this.props.destination } className="closeIcon"><IoIosClose/></Link>
      </button>
    );
  }
}

export default CloseIconPage;