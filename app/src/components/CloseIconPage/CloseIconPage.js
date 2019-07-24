import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CloseIconPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className="close" aria-label="Close" >
                <Link to="/menu"><span aria-hidden="true">&times;</span></Link>
            </button>
        );
    }
}

export default CloseIconPage;