import KeyringController from 'eth-keyring-controller';
import SimpleKeyring from 'eth-simple-keyring';

class WalletStorage {

  constructor() {

    this.keyringController = new KeyringController({
      keyringTypes: [SimpleKeyring],
      initState: {}.KeyringController
    });
  }

  createNewVaultAndRestore(mnemonic, password) {
    return this.keyringController.createNewVaultAndRestore(password, mnemonic);
  }

}

export default WalletStorage;
