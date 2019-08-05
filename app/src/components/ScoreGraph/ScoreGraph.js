import React, { Component } from 'react';
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart';

import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";
import './ScoreGraph.css';

class ScoreGraph extends Component {

  constructor(props) {
    super(props);
    this.state = { validations: 0, numberOfFields: 0 };        
  }

  componentDidMount() {
    this.props.getScore();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log('ScoreGraph/getDerivedStateFromProps nextProps', nextProps.persona);
    //console.log('ScoreGraph/getDerivedStateFromProps prevState', prevState);
    if (nextProps.persona.error.length>2) {
      const msg = 'Erro: ' + nextProps.persona.error;
      console.error('ScoreGraph/getDerivedStateFromProps: ', msg);
      alert(msg);
      return { validations: 0, numberOfFields: 0 };
    }
    return { validations: nextProps.persona.validations, numberOfFields: nextProps.persona.numberOfFields };        
  }

  render() {
    const percentage = (this.state.validations + this.state.numberOfFields)/10;

    return(
      <div>
        <div className="score-validations">
          <GaugeChart id="gauge-chart1" percent={percentage} />
          <br /> 
          {(percentage*100)} %
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  persona: state.persona
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScoreGraph);