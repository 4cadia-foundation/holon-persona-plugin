import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";
import Loader from '../../components/Loader/Loader';

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
        //console.log('CreateIdentity/getDerivedStateFromProps nextProps', nextProps.persona);
        //console.log('CreateIdentity/getDerivedStateFromProps prevState', prevState);
        if (nextProps.persona.error.length>2) {
            const msg = 'Erro: ' + nextProps.persona.error;
            console.error('CreateIdentity/getDerivedStateFromProps: ', msg);
            return { isLoading: false };
        }
        if (nextProps.persona.readAllPersonaLogs && nextProps.persona.numberOfFields>=2) {
          return { isLoading : false, redirect: true };
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
        //console.log('CreateIdentity/render state', this.state);
        if (this.state.redirect && !this.state.isLoading) {
            return <Redirect to='/home' />
        }
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="text-center">
                                <h3>Holon Identity</h3>
                            </div>
                        </Col>
                    </Row>
                    <div className="margin-top-50">
                        <Row>
                            <p className="Subtitle, text-center">To have a <b>Holon Identity</b>, please provide us with the following information.</p>
                        </Row>
                    </div>
                    <FormGroup className="margin-top-50">
                        <ControlLabel>Name</ControlLabel>

                        <FormControl
                            componentClass="input"
                            id="name"
                            type="text"
                            value={this.state.name}
                            placeholder="Name"
                            onChange={this.handleChange}
                        />


                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Email</ControlLabel>

                        <FormControl
                            componentClass="input"
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button className="margin-top-50" disabled={!this.validateForm()} block bsStyle="warning" onClick={this.handleClick}>Create ID</Button>
                </Grid>
                <Loader visible={this.state.isLoading} />
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