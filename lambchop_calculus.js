var lambda = require('js-lambda').lambda, λ = lambda;

var NUM = λ("f:f(λ(n:n+1))(0)");
var SUCC = λ("n:λ(f:λ(x:f(n(f)(x))))");

var ZERO = λ("f:λ(x:x)"); 
var ONE = SUCC(ZERO);
var TWO = SUCC(ONE);

var IF = λ("f:λ(t:λ(e:(f(t)(e))))"); 
var _IF = function(c) {
    return function(t) {
        return function(e) {
            return c(t)(e);
        };
    };
};

var TRUE = λ("t:λ(e:t)");
var _TRUE = function(t) {
    return function(e) {
        return t;
    };
};

var _FALSE = λ("t:λ(e:e)");
var FALSE = function(t) {
    return function(e) {
        return e;
    };
};

var result = IF(TRUE)(ZERO)(ONE);

process.stdout.write(NUM(result) + "\n");
