var λ = require('fantasy-check/src/adapters/nodeunit'),
    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),
    tuples = require('../../fantasy-tuples'),

    functionLength = helpers.functionLength,
    identity = combinators.identity,

    Tuple2 = tuples.Tuple2,
    Tuple3 = tuples.Tuple3,
    Tuple4 = tuples.Tuple4,
    Tuple5 = tuples.Tuple5;

function map(a, f) {
    var accum = [],
        total,
        i;

    for (i = 0, total = a.length; i < total; i++) {
        accum[i] = f(a[i]);
    }

    return accum;
}

function fill(s, f) {
    return map(range(0, s), f);
}

function range(a, b) {
    var total = b - a;
    var rec = function(x, y) {
        if (y - a >= total)
            return x;

        x[y] = y++;
        return rec(x, y);
    };
    return rec([], a);
}

function tuple2Of() {
    var self = this.getInstance(this, tuple2Of);
    self.types = [].slice.call(arguments);
    return self;
}
function tuple3Of() {
    var self = this.getInstance(this, tuple3Of);
    self.types = [].slice.call(arguments);
    return self;
}
function tuple4Of() {
    var self = this.getInstance(this, tuple4Of);
    self.types = [].slice.call(arguments);
    return self;
}
function tuple5Of() {
    var self = this.getInstance(this, tuple5Of);
    self.types = [].slice.call(arguments);
    return self;
}

var arbTuple = function(t, n) {
    return function(a, s) {
        var env = this;
        return t.apply(this, map(
            fill(n, function(i) {
                return a.types[i];
            }),
            function(arg) {
                return env.arb(arg, s);
            }
        ));
    };
};

var isTuple2Of = λ.isInstanceOf(tuple2Of);
var isTuple3Of = λ.isInstanceOf(tuple3Of);
var isTuple4Of = λ.isInstanceOf(tuple4Of);
var isTuple5Of = λ.isInstanceOf(tuple5Of);

function foldLeft(a, v, f) {
    var i;
    for (i = 0; i < a.length; i++) {
        v = f(v, a[i]);
    }
    return v;
}
function zipWith(a, b) {
    var accum = [],
        total = Math.min(a.length, b.length),
        i;
    for(i = 0; i<total; i++) {
        accum[i] = tuples.Tuple2(a[i], b[i]);
    }
    return accum;
}
function equals(a, b) {
    var x = Object.keys(a).sort().map(function(v) {
            return a[v];
        }),
        y = Object.keys(b).sort().map(function(v) {
            return b[v];
        });
    return foldLeft(zipWith(x, y), true, function(a, b) {
            return a && b._1 === b._2;
        });
}


λ = λ
    .property('equals', equals)
    .property('checkTagged', function(type, args, access) {
        var env = this;
        return function(test) {
            var length = functionLength(type);
            fill(length, identity).forEach(function (value, index) {
                function property() {
                    return access(type.apply(this, arguments), index) === arguments[index];
                }
                property._length = length;

                var report = env.forAll(property, args),
                    result = report.fold(
                        function(fail) {
                            return env.Tuple2(
                                false,
                                'Failed after ' + fail.tries + ' tries: ' + fail.inputs.toString()
                            );
                        },
                        function() {
                            return env.Tuple2(
                                true,
                                'OK'
                            );
                        }
                    );
                test.ok(result._1, result._2);
            });

            test.done();
        };
    })
    .property('tuple2Of', tuple2Of)
    .property('tuple3Of', tuple3Of)
    .property('tuple4Of', tuple4Of)
    .property('tuple5Of', tuple5Of)
    .method('arb', isTuple2Of, arbTuple(Tuple2, 2))
    .method('arb', isTuple3Of, arbTuple(Tuple3, 3))
    .method('arb', isTuple4Of, arbTuple(Tuple4, 4))
    .method('arb', isTuple5Of, arbTuple(Tuple5, 5));

if (typeof module != 'undefined')
    module.exports = λ;
