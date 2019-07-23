import React, { Component } from 'react';

class CloseIconPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className="close" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
            </button>
        );
    }
}

export default CloseIconPage;