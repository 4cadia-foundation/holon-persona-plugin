import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Button} from 'react-bootstrap';
import * as PersonaActions from '../../redux/actions/persona';
import './TableValidations.css';

class TableValidations extends Component {


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
  persona: state.persona 
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableValidations);
