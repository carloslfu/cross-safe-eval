# Cross safe eval

Node.js and browser 12 lines implementation of a safe eval :), install this module if you want or hardcode it!

```bash
npm i --save cross-safe-eval

```

use it as follows:

```javascript
var makeSafeEval = require('cross-safe-eval')

// no globals!!

var safeEval = makeSafeEval()

safeEval('this') // undefined
safeEval('console') // undefined
safeEval('eval') // undefined
safeEval('Math') // undefined
safeEval('window') // undefined, even in browser
safeEval('1 + 1') // 2
// not include local variables
var localNumber = 1034
safeEval('localNumber') // undefined

// include global variables!!

var safeEval2 = makeSafeEval(['Math', 'console'])

safeEval2('2 * Math.PI * 120') // 753.9822368615503
safeEval2('console.log(10)') // 10, undefined

```

## How?

Uses Object.getOwnPropertyNames(this) to obtain all environment globals and take care of it.
