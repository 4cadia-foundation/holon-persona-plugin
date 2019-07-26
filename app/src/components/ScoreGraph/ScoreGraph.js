import React, { Component } from 'react';
import * as PersonaActions from "../../redux/actions/persona";
import './ScoreGraph.css';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

class ScoreGraph extends Component {

  constructor(props) {
      super(props);
      this.state = {validations: 0, numberOfFields: 0};        
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
      return(
        <div>
          <div className="glyphicon glyphicon-dashboard imgGraph">
            Validations: { this.state.validations }
            <br />
            Fields: { this.state.numberOfFields }
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => ({
  persona: state.persona
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScoreGraph);