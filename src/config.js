require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.API,
  apiRoute: process.env.API_ROUTE,
  app: {
    title: 'Bought.today',
    description: 'All the modern best practices in one example.',
    meta: {
      charSet: 'utf-8',
      property: {
      }
    }
  }
}, environment);
