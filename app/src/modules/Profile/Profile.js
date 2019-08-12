import React, { Component } from 'react'
import { Col, Grid,FormControl, Row } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import Loader from '../../components/Loader/Loader';
import ScoreGraph from '../../components/ScoreGraph/ScoreGraph';
import user from '../../../images/user.png';
import '../../styles/_utils.css';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persona: this.props.persona,
            isLoading: true,
        };
        this.getCampoValor = this.getCampoValor.bind(this);
    }

    componentDidMount(){
        if (this.props.persona.numberOfFields > 0){
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
                    <div className="btn-profile-close">
                        <CloseIconPage destination="/menu"/>
                    </div>
                    <div className="text-center margin-top-15 margin-bottom-30">
                        <img src={user} alt="user" alt="user" />
                    </div>
                    <Row>
                        <Col bsClass="text-center">
                            <div className="text-center">
                                <FormControl
                                    id="name"
                                    type="text"
                                    value={ this.getCampoValor('name') }
                                    readOnly
                                    className="text-center paragraph"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="text-center margin-top-10">
                        <Col>
                            <FormControl
                                id="email"
                                type="text"
                                value={ this.getCampoValor('email') }
                                readOnly
                                className="text-center paragraph"
                            />
                        </Col>
                    </Row>
                        {
                            persona.personalInfo.filter((f) => f.field != 'name' && f.field != 'email').map((val, idx) =>
                            {
                                return(
                                    <Row className="text-center margin-top-10" key={'row_' + idx.toString()}>
                                        <Col>
                                            <FormControl
                                                id={idx.toString()}
                                                key={idx.toString()}
                                                type="text"
                                                value={val.valor}
                                                readOnly
                                                className="text-center paragraph"
                                            />
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    <Row className="margin-top-50 text-center paragraph">
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
