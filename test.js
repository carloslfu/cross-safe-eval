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

  t.plan(8)

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

})
