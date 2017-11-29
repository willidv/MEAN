module.exports = function() {
    return{
        add : function(x,y){
            let sum = x + y;
            console.log(sum)
        },
        multiply : function(x,y) {
            let quotient = x * y;
            console.log(quotient);
        },
        square : function(x){
            let perfect_square = x * x;
            console.log(perfect_square);
        },
        randomize : function(x,y){
            let randNum = Math.floor(Math.random() * (y -x + 1) + x);
            console.log(randNum);
        }
    }
};