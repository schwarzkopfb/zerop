'use strict'

var test = require('tap'),
    pad  = require('./')

test.test('api', function (test) {
    test.type(pad, 'function', 'main export should be a function')
    test.type(pad.left, 'function', 'pad.left should be a function')
    test.type(pad.right, 'function', 'pad.left should be a function')
    test.strictEqual(pad, pad.left, 'pad.left should be a reference to the main export')
    test.strictEqual(pad.version, require('./package.json').version, 'version should be exposed correctly')

    test.throws(
        function () {
            pad.left = null
        },
        TypeError,
        'pad.left should be read-only'
    )
    test.throws(
        function () {
            pad.right = null
        },
        TypeError,
        'pad.right should be read-only'
    )
    test.throws(
        function () {
            pad.version = null
        },
        TypeError,
        'pad.version should be read-only'
    )

    test.end()
})

test.test('left', function (test) {
    test.equal(pad(1), '01')
    test.equal(pad(1, 0), '01')
    test.equal(pad(1, 1), '1')
    test.equal(pad(1, 2), '01')
    test.equal(pad(12, 2), '12')
    test.equal(pad(42, 3, 16), '02a', 'radix should be used')

    test.end()
})

test.test('right', function (test) {
    test.equal(pad.right(1), '10')
    test.equal(pad.right(1, 0), '10')
    test.equal(pad.right(1, 1), '1')
    test.equal(pad.right(1, 2), '10')
    test.equal(pad.right(12, 2), '12')
    test.equal(pad.right(42, 3, 16), '2a0', 'radix should be used')

    test.end()
})
