let seed = 40;
let actualToken = 40;
let seedEmissionDate = new Date().toISOString();

exports.changeSeed = function () {
    seed = Math.round(Math.random() * 10 + Math.random() * 10 + 50);
    seedEmissionDate = new Date().toISOString();
    actualToken = exports.genToken();
    // console.log("Seed changed to " + seed + " at " + seedEmissionDate);
}

exports.genToken = function () {
    return Math.round(Math.random() * 100000000000000)
}
exports.getSeed = function () {
    return seed;
}
exports.getSeedEmission = function () {
    return seedEmissionDate;
}
exports.getActualToken = function () {
    return BigInt(actualToken).toString(2);
}
function fibo_reel(n) {
    if (n <= 1) {
        // console.log("a");
        return n
    }

    return fibo_reel(n - 1) + fibo_reel(n - 2);
}



