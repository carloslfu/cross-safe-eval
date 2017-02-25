var test = require('tape')
var makeSafeEval = require('./index')

function ignoreErrors (fn) {
  try {
    return fn()
  } catch (e) {
    return undefined
  }
}

test('safe eval function', function (t) {

  t.plan(10)

  var safeEval1 = makeSafeEval()

  t.equal(ignoreErrors(() => safeEval1('window')), undefined, 'should not have access to globals')
  t.equal(ignoreErrors(() => safeEval1('console')), undefined, 'should not have access to globals')
  t.equal(ignoreErrors(() => safeEval1('Math')), undefined, 'should not have access to globals')
  t.equal(ignoreErrors(() => safeEval1('this')), undefined, 'should not have access to \'this\' (global)')

  var localNumber = 1034

  t.equal(ignoreErrors(() => safeEval1('localNumber')), undefined, 'should not have access to locals')
  t.equal(ignoreErrors(() => safeEval1('globals')), undefined, 'should not have access to locals')

  t.equal(ignoreErrors(() => safeEval1('eval')), undefined, 'should not have access to functions like eval')

  var safeEval2 = makeSafeEval(['Math'])
  t.equal(ignoreErrors(() => safeEval2('Math.PI')), Math.PI, 'should have access to global variables when included')

  var fn = function () {
    this.method = function () {
      var safeEval3 = makeSafeEval()
      t.equal(ignoreErrors(() => safeEval3('window')), undefined, 'should have no access to local this')
      t.equal(ignoreErrors(() => safeEval3('console')), undefined, 'should have no access to local this')
    }
  }

  a = new fn()
  a.method()

})
