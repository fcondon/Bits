var lambda = require('js-lambda').lambda, λ = lambda;

var NUM = λ("f:f(λ(n:n+1))(0)");
var SUCC = λ("n:λ(f:λ(x:f(n(f)(x))))");

var ZERO = λ("f:λ(x:x)"); 
var ONE = SUCC(ZERO);
var TWO = SUCC(ONE);
var THREE = SUCC(TWO);

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

var FALSE = λ("t:λ(e:e)");
var _FALSE = function(t) {
    return function(e) {
        return e;
    };
};

// λm:λ(n:m(SUCC)(n))
var ADD = λ("m:λ(n:λ(f:λ(x:((n(f))((m(f))(x))))))");
var _ADD = function(m) {
    return function(n) {
        return m(SUCC)(n)
    };
}

var TIMES = λ("x:λ(y:λ(z:x(y(z))))");
var _TIMES = function(x) {
    return function(y) {
        return function(z) {
            return x(y(z));
        };
    };
}
