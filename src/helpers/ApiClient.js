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

  getLoggedInHeader() {
    return { 'Authorization': 'Bearer ' + reactCookie.load('token') };
  }

  async login(user) {
    const request = await fetch(this.getBaseUrl() + '/login', {
      method: 'post',
      body: JSON.stringify(user)
    });
    return await this.handleJson(request);
  }

  async getPayments() {
    const request = await fetch(this.getBaseUrl() + '/users/me/payments', {
      headers: this.getLoggedInHeader()
    });
    return await this.handleJson(request);
  }

  async createPayment(payment) {
    const request = await fetch(this.getBaseUrl() + '/users/me/payments', {
      method: 'post',
      body: JSON.stringify(payment),
      headers: this.getLoggedInHeader()
    });
    return await this.handleJson(request);
  }

  async handleJson(request) {
    const data = request.json();
    if (request.status >= 400) {
      throw new Error(data.error);
    } else {
      return data;
    }
  }
}
