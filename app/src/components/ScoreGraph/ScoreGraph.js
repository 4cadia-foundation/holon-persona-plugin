import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';

import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";
import './ScoreGraph.css';

class ScoreGraph extends Component {
  
  static propTypes = {
    color: PropTypes.string,
    shadowColor: PropTypes.string,
    style: PropTypes.object,
  }
  
  constructor(props) {
    super(props);
    this.state = {validations: 0, numberOfFields: 0};        
  }
  
  componentDidMount() {
    this.props.getScore();
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.persona.error.length>2) {
      const msg = 'Erro: ' + nextProps.persona.error;
      console.error('ScoreGraph/getDerivedStateFromProps: ', msg);
      alert(msg);
      return { validations: 0, numberOfFields: 0 };
    }
    return { validations: nextProps.persona.validations, numberOfFields: nextProps.persona.numberOfFields };        
  }
  
  render() {
    const percentage = ((this.state.validations + this.state.numberOfFields > 10 ? 10 : this.state.validations + this.state.numberOfFields) *10);
    console.log(percentage);
    return (
        <div className="score-validations">
          <CircularProgressbar
            value={percentage}
            text={`${percentage * 1}%`}
            styles={{
              root: {},
              path: {
                stroke: `rgba(240, 173, 78, ${percentage * 1})`,
                strokeLinecap: 'round',
                transition: 'stroke-dashoffset 0.5s ease 0s',
                // transformOrigin: 'center center',
                
              },
              trail: {
                stroke: '#d6d6d6',
                strokeLinecap: 'round',
                // transformOrigin: 'center center',
              },
              text: {
                fill: '#f0ad4e',
                fontSize: '16px',
                dominantBaseline: 'middle',
                textAnchor:'middle',
              }
            }}
          />
        </div>
    )
  }
}
  
  
const mapStateToProps = state => ({
  persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(ScoreGraph);