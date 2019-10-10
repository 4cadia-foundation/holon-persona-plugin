/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import Transactor from '../../../scripts/core/Transactor';
import store from '../../redux/store';

import './SelectValidador.css';

class SelectValidador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validators: [],
      numberOfValidators: 0,
      isRunning: true,
    };
    this.setValidator = this.setValidator.bind(this);
    this.transactor = new Transactor();
    this.transactor.wallet = store.getState().wallet.ethersWallet;
    // eslint-disable-next-line no-unused-expressions
    this.transactor.contractWithSigner;
  }

  async componentDidMount() {
    const tmp = await this.transactor._contract.getTotalValidators();
    const numberOfValidators = parseInt(tmp, 10);
    // console.log('SelectValidador/componentDidMount/numberOfValidators', numberOfValidators);
    const validators = [];
    for (let x = 0; x < numberOfValidators; x++) {
      const validatorAddress = this.transactor._contract.holonValidatorsList(x);
      const validatorName = this.transactor._contract.getPersonaData(validatorAddress, 'name');
      // console.log('SelectValidador/validator', x, validatorName, validatorAddress);
      const item = {
        address: validatorAddress,
        text: validatorName[1],
      };
      validators.push(item);
    }
    await Promise.all(validators);

    this.setState({
      isRunning: false,
      numberOfValidators,
      validators,
    });
    if (numberOfValidators > 0) {
      this.props.emitValidator(this.state.validators[0].address);
    }
  }

  setValidator(event) {
    this.props.emitValidator(event.target.value);
  }

  render() {
    if (this.state.isRunning) {
      return (
        <section>
          <div className="paragraph loading-optionValidator">
            Loading validators from Blockchain...
          </div>
        </section>
      );
    }

    if (!this.state.isRunning && this.state.validators.length > 0) {
      const optionTemplate = this.state.validators.map((v) => (
        <option key={v.address} value={v.address}>{v.text}</option>
      ));
      return (
        <section>
          <label className="paragraph">Select Validador</label>
            <div className="dropdown">
              <select onChange={this.setValidator} className="paragraph" value={this.state.value} id="categoryId">
                {optionTemplate}
              </select>
            </div>
        </section>
      );
    }

    // if (!this.state.isRunning && this.state.validators.length < 1) {
    //   return (
    //     <section>
    //       <div>
    //         There is no validator available
    //       </div>
    //     </section>
    //   );
    // }

    return (
      <section>
        <div>
          There is no validator available
        </div>
      </section>
    );
  }
}

export default SelectValidador;