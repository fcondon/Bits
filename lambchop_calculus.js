var lambda = require('js-lambda').lambda, λ = lambda;

var NUM = λ("f:f(λ(n:n+1))(0)");
var SUCC = λ("n:λ(f:λ(x:f(n(f)(x))))");

var ZERO = λ("f:λ(x:x)"); 
var ONE = SUCC(ZERO);
var TWO = SUCC(ONE);
var THREE = SUCC(TWO);
var FOUR = SUCC(THREE);

// λfte.fte
var IF = λ("f:λ(t:λ(e:(f(t)(e))))"); 
var _IF = function(c) {
    return function(t) {
        return function(e) {
            return c(t)(e);
        };
    };
};

// λte.t
var TRUE = λ("t:λ(e:t)");
var _TRUE = function(t) {
    return function(e) {
        return t;
    };
};

// λte.e
var FALSE = λ("t:λ(e:e)");
var _FALSE = function(t) {
    return function(e) {
        return e;
    };
};

// λmn.m(SUCC)(n)
var ADD = λ("m:λ(n:λ(f:λ(x:((n(f))((m(f))(x))))))");
var _ADD = function(m) {
    return function(n) {
        return m(SUCC)(n)
    };
}

// λxyz.x(yz)
var TIMES = λ("x:λ(y:λ(z:x(y(z))))");
var _TIMES = function(x) {
    return function(y) {
        return function(z) {
            return x(y(z));
        };
    };
}

// λn.n(λx.FALSE)TRUE
var ISZERO = λ("n:n(λ(x:λ(t:λ(e:e))))(λ(t:λ(e:t)))");
var _ISZERO = function(n) {
    return n(function(x) {
        return FALSE;
    })(TRUE);
}

// λnsz.n(λnf.f(n(s)))(λf.z)(λx.x)
var PRED = λ("n:(λ(s:λ(z:n(λ(n:λ(f:(f(n(s))))))(λ(f:z))(λ(x:x)))))");
var _PRED = function(n) {
    return function(s) {
        return function(z) {
            return n(function(n) {
                return function(f) {
                    return f(n(s));
                };
            })(function(f) {
                return z;
            })(function(x) {
                return x;
            });
        };
    };
}

// λf.(λx.f(xx))(λx.f(xx))
var Y = λ("f:(λ(x:f(x(x))))(λ(x:f(x(x))))");
var _Y = function(f) {
    return function(x) {
        return f(x(x));
    }(function(x) {
        return f(x(x));
    });
}

// λf.(λx.f(λy.xxy))(λx.f(λy.xxy))
var YS = λ("f:λ(x:(f(λ(y:(x(x))(y)))))(λ(x:(f(λ(y:(x(x))(y))))))");
var _YS = function(f) {
    return function(x) {
        return f(function(y) {
            return x(x)(y);
        });
    }(function(x) {
        return f(function(y) {
            return x(x)(y);
        });
    });
}

// λn.IF(ISZERO(n))(ONE)(TIMES(FACT(PRED(n)))(n))
var FACT = YS(λ("f:λ(n:"+IF+"("+ISZERO+"(n))("+ONE+")("+TIMES+"(f("+PRED+"(n))))(n))"));
var _FACT = function(n) {
    return IF(ISZERO(n))(function() {
                return ONE;
            })(function() {
                return TIMES(_FACT(PRED(n)))(n);
            })();
}
