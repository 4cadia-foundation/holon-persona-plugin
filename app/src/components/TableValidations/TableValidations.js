import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Button} from 'react-bootstrap';
import * as ValidationActions from '../../redux/actions/validations';
import './TableValidations.css';
import validations from "../../redux/reducers/validations";

class TableValidations extends Component {

  state = { modules: [
    {
      id: 1,
      type: 'RG',
      status: 'Aproved'
    },
    {
      id: 2,
      type: 'CPF',
      status: 'Waiting Aprovation'
    }
  ]}

  constructor(props) {
    super(props);

    this.state = {
      modules: this.props.modules
    }


    this.handleClick = this.handleClick.bind(this);

  }


  handleClick(){
    this.props.publicKey();
  }

  render () {

    const {modules} = this.state;
    
    return (
      <section>
        <Button bsStyle="success" onClick={() => this.props.getPersonaData()}>Get Persona Data</Button>
        <header>
          <h4 className="example">Table Documents Status</h4>
        </header>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody>
          {
            modules.map( doc => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.type}</td>
                <td>{doc.status}</td>
                <td>
                  <Button 
                    variant="outline-dark" 
                    size="sm" 
                    onClick={
                      () => this.props.toggleDocuments(modules, doc)
                    }>
                    Active</Button></td>
              </tr>
            ))
          }
          </tbody>

        </Table>

      </section>
    );
  }

}

const mapStateToProps = state => ({ 
  modules: state.validations
});

const mapDispatchToProps = dispatch => bindActionCreators(ValidationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableValidations);
