import config from '../config';
import fetch from 'isomorphic-fetch';
import reactCookie from 'react-cookie';

export default class ApiClient {
  getBaseUrl() {
    if (__SERVER__) {
      return config.apiRoute;
    }
    return '/api';
  }

  async login(user) {
    const request = await fetch(this.getBaseUrl() + '/login', {
      method: 'post',
      body: JSON.stringify(user)
    });
    const data = await request.json();
    if (request.status >= 400) {
      throw new Error(data.error);
    } else {
      return data;
    }
  }

  async getPayments() {
    const request = await fetch(this.getBaseUrl() + '/users/me/payments', {
      headers: {
        'Authorization': 'Bearer ' + reactCookie.load('token')
      }
    });
    const data = request.json();
    if (request.status >= 400) {
      throw new Error(data.error);
    } else {
      return data;
    }
  }
}
