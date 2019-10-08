import React, { Component } from 'react';
import { connect } from 'react-redux';
import GaugeChart from 'react-gauge-chart';

import { bindActionCreators } from 'redux';
import * as PersonaActions from '../../redux/actions/persona';
import './ScoreGraph.css';

class ScoreGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { validations: 0, numberOfFields: 0 };
  }

  componentDidMount() {
    this.props.getScore();
  }

  static getDerivedStateFromProps(nextProps, _) {
    if (nextProps.persona.error.length > 2) {
      return { validations: 0, numberOfFields: 0 };
    }
    return {
      validations: nextProps.persona.validations,
      numberOfFields: nextProps.persona.numberOfFields,
    };
  }

  render() {
    const percentage = (
      (this.state.validations + this.state.numberOfFields > 10 ? 10
        : this.state.validations + this.state.numberOfFields) / 10
    );

    return (
      <div>
        <div className="score-validations">
          <GaugeChart hideText={true} nrOfLevels={10} arcPadding={0.05} cornerRadius={3}
          percent={percentage} id="gauge-chart1" textColor="#000000"
          colors={['#FF0000', '#FFFF00', '#00FF00']}/>
          <br />
          {(percentage * 100)} %
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  persona: state.persona,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScoreGraph);