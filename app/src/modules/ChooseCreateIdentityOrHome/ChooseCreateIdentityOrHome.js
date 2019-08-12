import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';


import { connect } from 'react-redux';
import * as PersonaActions from "../../redux/actions/persona";

import Loader from '../../components/Loader/Loader';

class ChooseCreateIdentityOrHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      numberOfPersonalInfoRecorded: -1,
      msg: "Loading information from Blockchain"
    }
  }

  componentDidMount() {
    PersonaActions.getPersonaData(this.props.wallet,this.props.dispatch)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log('ChooseCreateIdentityOrHome/getDerivedStateFromProps nextProps', nextProps.persona);
    //console.log('ChooseCreateIdentityOrHome/getDerivedStateFromProps prevState', prevState);
    if (nextProps.persona.error.length>2) {
        const msg = 'Erro: ' + nextProps.persona.error;
        console.error('ChooseCreateIdentityOrHome/getDerivedStateFromProps: ', msg);
        return { isLoading: false };
    }
    if (nextProps.persona.readAllPersonaLogs ) {
      return { isLoading : false, numberOfPersonalInfoRecorded: nextProps.persona.numberOfFields };
    }
    return null;
  }

  render() {
    //console.log('ChooseCreateIdentityOrHome/render state', this.state);
    if (this.state.numberOfPersonalInfoRecorded >= 2) {
      //console.log('ChooseCreateIdentityOrHome/rendering to home', this.state);
      return (
        <Redirect to="/home" />
      )
    } else if (!this.state.isLoading && this.state.numberOfPersonalInfoRecorded === 0) {
      return (
        <Redirect to="/createidentity" />
      )
    } else {
      return (
        <Loader visible={this.state.isLoading} message={this.state.msg} />
      )
    }
  }
}

const mapStateToProps = state => ({
  persona: state.persona, wallet: state.wallet,
});

export default connect(mapStateToProps)(ChooseCreateIdentityOrHome);
