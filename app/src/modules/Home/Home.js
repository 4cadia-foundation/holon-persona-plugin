import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Label, Table } from 'react-bootstrap';
import * as PersonaActions from '../../redux/actions/persona';
import logo from '../../../images/logo.png';
import Menu from '../../components/Menu/Menu';
import Loader from '../../components/Loader/Loader';
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

  //TODO: Migrar para getDerivedStateFromProps que será o padrao do React 17
  //https://itnext.io/react17-or-how-to-get-rid-of-componentwillreceiveprops-c91f9a6f6f03
  componentWillReceiveProps(propsOld) {
    // console.log('home/componentWillReceiveProps/state', this.state.persona.personalInfo);
    // console.log('home/componentWillReceiveProps/propsOld', propsOld.persona.personalInfo);
    if (this.state.persona.personalInfo.length != propsOld.persona.personalInfo.length) {
      this.setState({
        persona: propsOld.persona,
        isLoading: false,
      })
    }
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
        <Grid id="gridHome">
          <Menu/>
          <section id="sectionBasicInfo">
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

          <section id="sectionValidation">
            <Row>
                <h5 id="titleValidation">Validations</h5>
                <hr className="horizontalLine"></hr>
              </Row>
            <Table striped id='tableValidation'>
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
