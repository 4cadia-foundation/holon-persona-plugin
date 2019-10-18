import React, { Component } from 'react'
import { Button, Glyphicon, FormGroup, Grid, Row, Form } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as PersonaActions from "../../redux/actions/persona";

import Loader from '../../components/Loader/Loader';
import './CreateIdentity.css';

class CreateIdentity extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            name: "",
            email: "",
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.persona.error.length > 2) {
            const msg = 'Erro: ' + nextProps.persona.error;
            console.error('CreateIdentity/getDerivedStateFromProps: ', msg);
            return { isLoading: false };
        }
        if (nextProps.persona.readAllPersonaLogs && nextProps.persona.numberOfFields >= 2) {
            return { isLoading: false, redirect: true };
        }
        return null;
    }

    validateForm() {
        return this.state.name.length > 3 && this.state.email.length > 7;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleClick(event) {
        event.preventDefault();
        this.props.addPersona(this.state.name, this.state.email);
        this.setState({
            isLoading: true
        });
    }

    render() {
        if (this.state.redirect && !this.state.isLoading) {
            return <Redirect to='/home' />
        }
        return (
            <div>
                <Grid>
                    <Row className="margin-top-50">
                        <div className="text-center">
                            <h3 className="title">Holon Identity</h3>
                        </div>
                    </Row>
                    <div className="margin-top-30">
                        <Row>
                            <p className="text-center paragraph">To have a <b>Holon Identity</b>, please provide us with the following information.</p>
                        </Row>
                    </div>
                    <div>
                        <Form onSubmit={ this.handleClick }>
                            <FormGroup>
                                <div className="form">
                                    <input type="password" required                                 
                                        componentClass="input"
                                        id="name"
                                        type="text"
                                        value={this.state.name}
                                        placeholder="Name"
                                        onChange={this.handleChange} />

                                    <label type="name" className="label-name">
                                        <span className="content-name">Name</span>
                                    </label>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <div className="form">
                                    <input type="password" required                                 
                                        componentClass="input"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleChange} />

                                    <label type="name" className="label-name">
                                        <span className="content-name">Email</span>
                                    </label>
                                </div>
                            </FormGroup>
                            
                            <div className="buttons-identity">
                                <Button  id="btn-create-save" type="submit" className="paragraph buttons-identity-size" disabled={!this.validateForm()} block bsSize="large" bsStyle="warning" onClick={this.handleClick}>Save in Blockchain</Button>
                                <Button  id="btn-create-save" type="submit" className="paragraph buttons-identity-size" block bsSize="large" bsStyle="warning" > Save in browser</Button>
                            </div>
                            
                        </Form>
                    </div>

                    <Glyphicon glyph="chevron-left" className="margin-top-20" onClick={() => this.props.history.push('/walletpassword')}/>
                </Grid>
                <Loader message="Initializing your identity..." visible={this.state.isLoading} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: state.name,
    email: state.email,
    persona: state.persona,
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateIdentity);