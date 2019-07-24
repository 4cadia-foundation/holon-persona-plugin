import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
class CloseIconPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className="close" aria-label="Close" >
                <Link to={ this.props.destination }><Glyphicon glyph="remove" /></Link>
            </button>
        );
    }
}

export default CloseIconPage;