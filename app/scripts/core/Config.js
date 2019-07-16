import axios from 'axios';

export default class Config {

  static loadConfigJSON (file) {
    return axios.get(file)
      .then((response) => {
        return response.data;
      })
      .catch((exception) => {
        console.error('[Config] Error: ' + exception);
      });
  }

}


