var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://118.178.93.124:8088"',
  // BASE_API: '"http://192.168.11.141:8080/sqms"',
})
// module.exports = {
//   NODE_ENV: '"development"',
// 	BASE_API: '"http://118.178.93.124:8088"',
//   // BASE_API: '"http://localhost:8080/sqms"',
//   APP_ORIGIN: '""'
// }