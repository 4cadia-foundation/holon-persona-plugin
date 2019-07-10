import React, { Component } from 'react'
import {Table} from 'react-bootstrap';

import './TableValidations.css';

class TableValidations extends Component {


  constructor(props) {
    super(props);

  }

  render () {

    const { modules } = this.state;

    return (
      <section>
        <header>
          <h4 className="example">Table Documents Status</h4>
        </header>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
          </thead>

          <tbody>
          {
            modules.map( module => (
              <tr key={module.id}>
                <td>{module.id}</td>
                <td>{module.type}</td>
                <td>{module.status}</td>
              </tr>
            ))
          }
          </tbody>

        </Table>

      </section>
    );
  }

}


export default TableValidations;
