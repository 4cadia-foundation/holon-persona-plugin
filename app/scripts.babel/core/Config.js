import axios from 'axios';

class Config {

  static async loadConfigJSON (file) {
    return await axios.get(file)
      .then((response) => {
        return response.data;
      })
      .catch((exception) => {
        console.error('[Config] Error: ' + exception);
      });
  }

}


module.exports = Config;