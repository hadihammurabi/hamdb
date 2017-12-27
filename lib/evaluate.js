const evaluate = function(){

    this.run = function(cmd){
        console.log(cmd)
    }

    return this
}

module.exports = evaluate()
