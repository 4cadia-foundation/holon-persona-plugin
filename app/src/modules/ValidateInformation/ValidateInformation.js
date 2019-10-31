import React, { Component } from 'react';
import { Button, Col, Form, FormControl, Grid, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import SelectPersonaInfoFields from '../../components/SelectPersonaInfoFields/SelectPersonaInfoFields';
import SelectValidador from '../../components/SelectValidador/SelectValidador';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/ModalValidate'
import '../../styles/_utils.css';
import './ValidateInformation.css'

class ValidateInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validator: '',
            ipfsHash: '',
            field: '',
            uriConfirmationData: '',
            isLoading: true,
            saveButtonCalled: false,
            executed: false,
            loadingMsg: 'Loading data from Blockchain',
        }
        this.handleChange = this.handleChange.bind(this);
        this.setValidator = this.setValidator.bind(this);
        this.setField = this.setField.bind(this);
        this.setIpfsHash = this.setIpfsHash.bind(this);

    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.persona.error.length > 2) {
            const msg = 'Erro: ' + nextProps.persona.error;
            console.error('validateInformation/getDerivedStateFromProps: ', msg);
            return { isLoading: false };
        }
       
        if (nextProps.persona.isRunning !== prevState.isLoading && prevState.saveButtonCalled) {
            return { isLoading: nextProps.persona.isRunning, executed: true };
        }
        return null;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    setValidator(address) {
        this.setState({
            validator: address,
        })
    }

    setField(fieldName) {
        this.setState({
            field: fieldName,
        })
    }

    setIpfsHash(hash) {
        this.setState({ ipfsHash: hash });
    }

    render () {

        if (this.state.executed) {
            return (
                <Redirect to='/home' />
            )
        }
        return (
            <Grid>
                <div className="btn-validate-close">
                 <CloseIconPage destination="/menu"/>    
                </div>
                <Row>
                  <Col xs={12} md={12}>
                      <div className="margin-top-18 text-center">
                          <h3 className="title">Validation</h3>
                      </div>
                  </Col>
                </Row>
                <Form className="margin-top-10">
                    <div className="space-between">
                        <div>
                            <SelectPersonaInfoFields emitField={this.setField} personalInfo={this.props.persona.personalInfo} />
                        </div>
                        <div className="margin-top-10">
                            <SelectValidador emitValidator={this.setValidator} />
                        </div>
                        <div>
                            <label className="paragraph label-add">Data's proof URL</label>
                            <FormControl
                                id="uriConfirmationData"
                                type="text"
                                value={this.state.info}
                                placeholder="Information"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                </Form>
                
                <Modal />

                <Loader message={this.state.loadingMsg} visible={this.state.isLoading} />
            </Grid>
        );
    }
}

const mapStateToProps = state => ({ 
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(ValidateInformation);