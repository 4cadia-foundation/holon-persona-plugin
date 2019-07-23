import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";

class CreateIdentity extends Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          name: "",
          email: ""
        };          
    }

    validateForm() {
        return this.state.name.length > 3 && this.state.email.length > 7;
    }    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }    
    handleClick(){
        console.log("Funcionou");
    }    

    render () {
        if (this.props.wallet.address.length > 2) {
            console.log('CreateIdentity/render/address', this.props.wallet.address);
            return (
              <Redirect to="/home" />
            );
        }
        return (
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
                        <p className= "Subtitle, text-center">To have a <b>Holon Identity</b>, please provide us with the following information.</p>
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
                <Button className="margin-top-50" disabled={!this.validateForm()} block bsStyle="warning" onClick={ () => this.props.history.push('/home')}>Create ID</Button>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    wallet: state.wallet,
    persona: state.persona
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateIdentity);