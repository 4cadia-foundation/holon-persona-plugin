import React, { Component } from 'react';
import {connect} from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';

import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";
import './ScoreGraph.css';

class Score extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        percentage: 25
      };
  
      this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }
  
    handleChangeEvent(event) {
      this.setState({
        percentage: event.target.value
      });
    }
  
    render() {
      return (
        const percentage = 66,

        <CircularProgressbar value={percentage} text={`${percentage}%`} />;
      )
    }
}
  
const mapStateToProps = state => ({
    persona: state.persona
});
    
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
    
export default connect(mapStateToProps, mapDispatchToProps)(Score);