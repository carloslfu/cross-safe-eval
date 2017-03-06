var globals = Object.getOwnPropertyNames(this)

module.exports = function makeSafeEval (include) {
  var clearGlobals = ''
  for (var i = 0, len = globals.length; i < len; i++) {
    if (include && include.indexOf(globals[i]) === -1 || !include) {
      clearGlobals += 'var ' + globals[i] + ' = undefined;'
    }
  }
  return function (operation) {
    var globals = undefined // out of scope for operation
    return eval('(function () {' + clearGlobals + ';return ' + operation.replace('this', '_this') + '})()')
  }
}
