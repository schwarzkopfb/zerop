'use strict'

var COUNT = process.env.COUNT || 5000000,
    NUM   = process.env.NUM || ~~(Math.random() * 100) + '',
    LEN   = process.env.LEN || 12

var spec = {
    'zero-fill': function (fn) {
        return function (n, l) {
            return fn(l, n)
        }
    },

    pad: function (fn) {
        return function (n, l) {
            return fn(l, n, '0')
        }
    },

    npad: function (fn) {
        fn = fn.left

        return function (n, l) {
            return fn(n, l, '0')
        }
    }
}

function wrap(fn) {
    return function (n, l) {
        return fn(n, l)
    }
}

function measure(pkg) {
    var pad = require(pkg),
        lbl = require(pkg + '/package.json').name

    // different function signature, wrap it to match
    if (pkg in spec)
        pad = spec[ pkg ](pad)
    // add the overhead of one plus function call
    // to each module to be fair
    else
        pad = wrap(pad)

    console.time(lbl)
    for (var i = COUNT; i--;)
        pad(NUM, LEN)
    console.timeEnd(lbl)
}

console.log('\ndisplaying the elapsed time it takes to perform', COUNT, 'calls per package')
console.log('(which means that lower values are better)\n');

[
    './',
    'pad',
    'zpad',
    'npad',
    'zeroise',
    'padster',
    'zerofill',
    'zero-fill'
]
    .forEach(measure)

console.log()
