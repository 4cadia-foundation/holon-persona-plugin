import React, { Component } from 'react';

import './SliderSaveOption.css';

class SliderSaveOption extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <div className="slider-container margin-top-30">
                    <p className="paragraph">Browser</p>
                    <input type="range" min="1" max="2" step="1" className="slider" id="slider-size"/>
                    <p className="paragraph">Blockchain</p>
                </div>
            </section>
        )
    }
}

export default SliderSaveOption;