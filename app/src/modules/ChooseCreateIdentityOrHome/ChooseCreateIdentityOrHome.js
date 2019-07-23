import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from "../../redux/actions/persona";
import Loader from '../../components/Loader/Loader';

class ChooseCreateIdentityOrHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      numberOfPersonalInfoRecorded: -1
    }
  }

  componentDidMount() {
    this.props.getPersonaData()
    this.setState({
      isLoading: false,
      numberOfPersonalInfoRecorded: this.props.persona.personalInfo.length
    })
  }  

  render() {
    if (this.state.numberOfPersonalInfoRecorded > 0) {
      return (
        <Redirect to="/home" />
      )
    } else if (this.state.numberOfPersonalInfoRecorded === 0) {
      return (
        <Redirect to="/createidentity" />
      )
    } else {
      return (
        <Loader visible={this.state.isLoading} />
      )
    }
  }
}

const mapStateToProps = state => ({ 
  persona: state.persona
});
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCreateIdentityOrHome);