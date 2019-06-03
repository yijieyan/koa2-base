module.exports = {
  "env": {
    "node": true
   },
  "extends": "standard",
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'semi':['error','always']
  }
};