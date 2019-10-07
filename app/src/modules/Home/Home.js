import React, { Component } from 'react';
import { Grid, Row, Label, Table } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import logo from '../../../images/logo.png';
import Loader from '../../components/Loader/Loader';
import HamburguerMenu from '../../components/HamburguerMenu/HamburguerMenu';
import './Home.css';

class Home extends Component {
  
  constructor(props) {
    super(props);      
    this.state = {
      persona: this.props.persona,
      isLoading: true,
      msg: "Loading profile from Blockchain",
    }
    this.getCampoValor = this.getCampoValor.bind(this); 
  }

  componentDidMount() {
    if (this.props.persona.numberOfFields < 1) {
      this.props.getPersonaData(); 
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log('WalletPassword/getDerivedStateFromProps nextProps', nextProps.persona);
    //console.log('WalletPassword/getDerivedStateFromProps prevState', prevState);
    if (nextProps.persona.error.length>2) {
        const msg = 'Erro: ' + nextProps.persona.error;
        console.error('Home/getDerivedStateFromProps: ', msg);
        alert(msg);
        return { isLoading: false };
    }
    if (nextProps.persona.readAllPersonaLogs) {
        return { isLoading : false, persona: nextProps.persona };
    }
    return null;
  }

  getCampoValor(campo) {
    const {persona} = this.state;
    if (persona.personalInfo.length < 1) {
      return '';
    }
    let filtro = persona.personalInfo.filter(item => {
      return item.field == campo;
    });
    if (!filtro[0]) {
      return '';
    }
    return filtro[0].valor;
  }

  getValidationDescClass(statusValidation) {
    //console.log('getValidationDescClass', statusValidation)
    if (statusValidation == "0") {
      return "success"
    } else if (statusValidation == "4") {
      return "warning"
    } else {
      return "danger"
    }
  }

  render () {
    const {persona} = this.state;
    
    return (
        <div className="fund">
          <HamburguerMenu />
          <div className="card-fund">
            <div className="card-text">
              <Row className="text-center">
                <p className="paragraph basicInfoHome">{ this.props.persona.address }</p>
              </Row>
              <Row className="text-center">
                <p className="paragraph basicInfoHome">{ this.getCampoValor('name') }</p>
              </Row>
              <Row className="text-center">
                <p className="paragraph basicInfoHome">{ this.getCampoValor('email') }</p>
              </Row>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({ 
  persona: state.persona
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
