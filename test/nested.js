const {tagged} = require('daggy');
const {nested, Tuple} = require('../fantasy-tuples');
const {isNumber, isString, isInstanceOf} = require('fantasy-helpers');
const env = require('fantasy-environment')();

const Sum = tagged('x');

const λ = env
    .method('concat', isString, (a, b) => a + b)
    .method('map', isString, (a, f) => f(a))
    .method('equals', isString, (a, b) => a === b)
    .method('concat', isNumber, (a, b) => a + b)
    .method('map', isNumber, (a, f) => f(a))
    .method('equals', isNumber, (a, b) => a === b)
    .method('map', isInstanceOf(Sum), function(a, f) { return Sum(this.map(a.x, f)); })
    .method('equals', isInstanceOf(Sum), function(a, b) { return this.equals(a.x, b.x); })
    .method('equals', isInstanceOf(Tuple), function(a, b) { return this.equals(a._1, b._1) && this.equals(a._2, b._2) });

function Monoid(a) {
    return {
        empty: () => Sum(0),
        concat: (x, y) => Sum(a.concat(x, y))
    };
}

function Setoid(a) {
    return {
        equals: (x, y) => a.equals(a, b)
    };
}

const M = Monoid(λ);
const F = nested.Functor(λ);
const S = nested.Setoid(λ);

exports.nested = {
    'testing': function(t) {
        const tuple = nested.Monoid(M, M).empty();
        const mapped = F.map(tuple, (x) => x + 1);
        t.ok(S.equals(Tuple(Sum(0), Sum(1)), mapped));
        t.done();
    }
};