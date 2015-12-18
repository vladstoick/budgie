import config from '../config';
import fetch from 'isomorphic-fetch';

export default class ApiClient {
  getBaseUrl() {
    if (__SERVER__) {
      return config.apiRoute;
    }
    return '/api';
  }

  async login(user) {
    console.log(this.getBaseUrl() + '/login');
    const request = await fetch(this.getBaseUrl() + '/login', {
      method: 'post',
      body: JSON.stringify(user)
    });
    return request;
  }
}
