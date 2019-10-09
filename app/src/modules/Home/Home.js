import React, { Component } from 'react';
import { Row, Collapse, Well, Button} from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import logo from '../../../images/icon-19.png';
import Loader from '../../components/Loader/Loader';
import HamburguerMenu from '../../components/HamburguerMenu/HamburguerMenu';
import './Home.css';
import HomeCard from '../../components/HomeCard/HomeCard';

class Home extends Component {
  
  constructor(props, context) {
    super(props, context);      
    this.state = {
      persona: this.props.persona,
      isLoading: true,
      msg: "Loading profile from Blockchain",
      open: false
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
      <div>
        <div className={this.props.location.pathname === '/home' ? 'fund-orange': ''}>   </div>
        <HamburguerMenu />
        <Row className="logo-home">
              <img className="logoHome" src={logo} alt="Logo" />
        </Row>
        <div>
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
        <div className="validations-title">
          <p>Validations</p>
          <hr className="linha-home"></hr>
        </div>
          <div className="app">
            <HomeCard title="Aqui tem um titulo">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</HomeCard>
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