import React, { Component } from 'react';

class SliderSaveOption extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <div className="sliderContainer margin-top-30">
                    <input type="range" min="1" max="3" step="1" className="slider"/>
                    <div className="optionsSave margin-top-10">
                        <p>Save Local</p>
                        <p>Save in Blockchain</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default SliderSaveOption;