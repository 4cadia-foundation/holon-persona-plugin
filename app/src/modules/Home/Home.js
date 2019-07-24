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
      isLoading: true
    }
    this.getCampoValor = this.getCampoValor.bind(this); 
    this.getAddress = this.getAddress.bind(this);    
  }

  componentDidMount() {
    if (this.state.persona.personalInfo.length === 0) {
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

  getAddress() {
    const {persona} = this.state;
    return persona.address;
  }

  render () {
    const {persona} = this.state;
    
    return (
      <div>
        <Grid>
          <HamburguerMenu />
          <section className="sectionBasicInfo">
            <hr className="horizontalLine"></hr>
            <Row className="text-center">
              <img className="logoHome" src={logo} alt="Logo" />
            </Row>
            <Row className="text-center">
              <p className="basicInfoHome">{ this.getAddress() }</p>
            </Row>
            <Row className="text-center">
              <p className="basicInfoHome">{ this.getCampoValor('name') }</p>
            </Row>
            <Row className="text-center">
              <p className="basicInfoHome">{ this.getCampoValor('email') }</p>
            </Row>
          </section>

          <section className="sectionValidation">
            <Row>
                <h5 className="titleValidation">Validations</h5>
                <hr className="horizontalLine"></hr>
              </Row>
            <Table striped className='tableValidation'>
              <tbody>
                {persona.personalInfo.map((item, index) =>                 
                      <tr key={index}>
                        <td className="text-center">{item.field}</td>
                        <td className="text-center">{item.valor}</td>
                        <td className="text-center">
                          <Label bsStyle={ item.statusValidationCode == "0" ? 'success' : 'danger'}>
                            {item.statusValidationDescription}
                          </Label>
                        </td>
                      </tr>
                  )
                }          
              </tbody>
            </Table>
          </section>
        </Grid>
        <Loader visible={this.state.isLoading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  persona: state.persona
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
