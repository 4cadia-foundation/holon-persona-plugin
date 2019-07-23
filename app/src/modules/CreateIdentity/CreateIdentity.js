import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

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
    handleClick(event) {
        event.preventDefault();
        this.props.addPersona(this.state.name, this.state.email);
    }

    render() {
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
        );
    }
}

const mapStateToProps = state => ({
    name: state.name,
    email: state.email,
});
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateIdentity);