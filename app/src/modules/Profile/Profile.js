import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PersonaActions from '../../redux/actions/persona';
import logo from '../../../images/icon-38.png';
import {Grid, Row, Col, Form, FormControl } from 'react-bootstrap';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import ScoreGraph from '../../components/ScoreGraph/ScoreGraph';
import './Profile.css';
import Loader from '../../components/Loader/Loader';

class Profile extends Component {
    // Alterado
    constructor(props) {
        super(props);
        this.state = {
            persona: this.props.persona,
            isLoading: true
        };        
        this.getCampoValor = this.getCampoValor.bind(this); 
    }

    componentDidMount(){        
        if (this.props.persona.personalInfo.length > 0){
            this.setState({
                isLoading:false
            })
        } else {
            this.props.getPersonaData();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.persona.address != nextProps.persona.address) {
            return { persona: nextProps.persona, isLoading: false };
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
    

    render() {
        const {persona} = this.state;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col>
                            <img className="logoHome" src={logo} alt="Logo" />
                            <CloseIconPage destination="/menu"/>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <div className="glyphicon glyphicon-user imgPersona"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col bsClass="text-center">
                            <div className="text-center">
                                <FormControl
                                    id="name"
                                    type="text"
                                    value={ this.getCampoValor('name') }
                                    readOnly
                                    className="text-center" 
                                />
                            </div>
                        </Col>
                    </Row>  
                    <Row>
                        <Col>
                        </Col>
                    </Row>     
                    <Row className="text-center">
                        <Col>
                            <FormControl
                                id="email"
                                type="text"
                                value={ this.getCampoValor('email') }
                                readOnly
                                className="text-center" 
                            />
                        </Col>
                    </Row>    
                    <Row>
                        <Col>
                        </Col>
                    </Row>   
                        {
                            persona.personalInfo.filter((f) => f.field != 'name' && f.field != 'email').map((val, idx) =>
                            {
                                return(
                                    <Row className="text-center" key={'row_' + idx.toString()}>
                                        <Col>
                                            <FormControl
                                                id={idx.toString()}
                                                key={idx.toString()}
                                                type="text"
                                                value={val.valor}
                                                readOnly
                                                className="text-center"
                                            />                      
                                        </Col>
                                    </Row>
                                )
                            })
                        }                            
                    <Row className="text-center">
                        <Col>
                            <ScoreGraph/>
                        </Col>
                    </Row>       
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);