const λ = require('./lib/test');
const tuples = require('../fantasy-tuples');

exports.tuples = {
    'when checking tuple2 constructor arguments': λ.checkTagged(
        tuples.Tuple2,
        [λ.AnyVal, λ.AnyVal],
        (tuple, index) => tuple['_' + (index + 1)]
    ),
    'when checking tuple3 constructor arguments': λ.checkTagged(
        tuples.Tuple3,
        [λ.AnyVal, λ.AnyVal, λ.AnyVal],
        (tuple, index) => tuple['_' + (index + 1)]
    ),
    'when checking tuple4 constructor arguments': λ.checkTagged(
        tuples.Tuple4,
        [λ.AnyVal, λ.AnyVal, λ.AnyVal, λ.AnyVal],
        (tuple, index) => tuple['_' + (index + 1)]
    ),
    'when checking tuple5 constructor arguments': λ.checkTagged(
        tuples.Tuple5,
        [λ.AnyVal, λ.AnyVal, λ.AnyVal, λ.AnyVal, λ.AnyVal],
        (tuple, index) => tuple['_' + (index + 1)]
    )
};

exports.tuple2 = {
    'when checking concat should return correct value': λ.check(
        (a, b) => {
            return λ.equals(
                a.concat(b),
                tuples.Tuple2(
                    a._1.concat(b._1),
                    a._2.concat(b._2)
                )
            );
        },
        [
            λ.tuple2Of(String, String),
            λ.tuple2Of(String, String)
        ]
    )
};

exports.tuple3 = {
    'when checking concat should return correct value': λ.check(
        (a, b) => {
            return λ.equals(
                a.concat(b),
                tuples.Tuple3(
                    a._1.concat(b._1),
                    a._2.concat(b._2),
                    a._3.concat(b._3)
                )
            );
        },
        [
            λ.tuple3Of(String, String, String),
            λ.tuple3Of(String, String, String)
        ]
    )
};

exports.tuple4 = {
    'when checking concat should return correct value': λ.check(
        (a, b, c, d) => {
            return λ.equals(
                a.concat(b),
                tuples.Tuple4(
                    a._1.concat(b._1),
                    a._2.concat(b._2),
                    a._3.concat(b._3),
                    a._4.concat(b._4)
                )
            );
        },
        [
            λ.tuple4Of(String, String, String, String),
            λ.tuple4Of(String, String, String, String)
        ]
    )
};

exports.tuple5 = {
    'when checking concat should return correct value': λ.check(
        (a, b, c, d) => {
            return λ.equals(
                a.concat(b),
                tuples.Tuple5(
                    a._1.concat(b._1),
                    a._2.concat(b._2),
                    a._3.concat(b._3),
                    a._4.concat(b._4),
                    a._5.concat(b._5)
                )
            );
        },
        [
            λ.tuple5Of(String, String, String, String, String),
            λ.tuple5Of(String, String, String, String, String)
        ]
    )
};
