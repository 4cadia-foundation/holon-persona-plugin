import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import './ModalValidate.css';

export class ModalValidate extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleHide = this.handleHide.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      uriConfirmationData: '',
      show: false
    }
  }

  handleHide() {
    this.setState({ show: false });
  }

  validateForm() {
    return this.state.uriConfirmationData.length > 1;
  }

  handleClick(event) {
    event.preventDefault();
    const validator = this.state.validator;
    const field = this.state.field;
    var uriConfirmationData = '';
    if (this.state.ipfsHash.length > 10){
        uriConfirmationData = this.state.ipfsHash;
    } else {
        uriConfirmationData = this.state.uriConfirmationData;
    }
    this.setState({
        isLoading: true,
        saveButtonCalled: true,
        loadingMsg: 'Submitting data to validator',
    });
    this.props.askToValidate(validator, field, uriConfirmationData);
  }

  render() {
    return(
      <div className="modal-container" style={{ height: 200 }}>
        <Button
          bsStyle="warning"
          className="button-screen margin-top-80"
          onClick={() => this.setState({ show: true })}
        >
          Save
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Blockchain save
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your data will me saved in the blockchain, do you want to continue?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="warning" onClick={this.handleHide}> No, I don't want save</Button>
            <Button bsStyle="warning" disabled={!this.validateForm()} onClick={this.handleClick}> Save in blockchain</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalValidate;