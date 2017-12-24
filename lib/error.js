const msg = require('print-message')
const color = require('colors')

const error = function(props){

    let errpr = [
        color.red(props.name),
        props.message,
        props.resolve
    ]

    this.print = function(){
        msg(errpr,{
            borderColor: 'red'
        })
    }

    return this
}

module.exports = error