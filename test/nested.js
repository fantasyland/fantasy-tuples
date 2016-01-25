const {tagged} = require('daggy');
const {nested, Tuple} = require('../fantasy-tuples');
const {isNumber, isString, isInstanceOf} = require('fantasy-helpers');
const env = require('fantasy-environment')();

const Sum = tagged('x');

Sum.prototype.equals = function(b) {
    return Setoid(λ).equals(this, b);
}

const λ = env
    .method('concat', isString, (a, b) => a + b)
    .method('map', isString, (a, f) => f(a))
    .method('equals', isString, (a, b) => a === b)
    .method('concat', isNumber, (a, b) => a + b)
    .method('map', isNumber, (a, f) => f(a))
    .method('equals', isNumber, (a, b) => a === b);

function Monoid(a) {
    return {
        empty: () => Sum(0),
        concat: (x, y) => Sum(a.concat(x, y))
    };
}

function Functor(a) {
    return {
        map: (x, f) => Sum(a.map(x.x, f))
    };
}

function Setoid(a) {
    return {
        equals: (x, y) => {
            return a.equals(x.x, y.x);
        }
    };
}

function inc(x) {
    return x + 1;
}

const M = Monoid(λ);
const F = nested.Functor(λ);
const S = nested.Setoid(λ);

exports.nested = {
    'testing': function(t) {
        const tuple = nested.Monoid(M, M).empty();
        const mapped = F.map(tuple, (x) => Functor(λ).map(x, inc));
        t.ok(S.equals(Tuple(Sum(0), Sum(1)), mapped));
        t.done();
    }
};