import Axios from 'axios';

class Req {
  constructor() {
    const axiosApi = Axios.create({
      baseURL: 'http://0.0.0.0:3001/',
    });

    this.axios = (method, url, data, opt) => {
      if (method === 'get') return axiosApi({ method, url, params: data, ...opt });
      return axiosApi({ method, url, data, ...opt });
    };
  }

  async getRessources() {
    return this.axios('get', 'ressources');
  }

  async mixIngredients(ingredients) {
    return this.axios('post', 'ressources', { ingredients });
  }
}
const req = new Req();

export default req;
