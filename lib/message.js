const msg = require('print-message')
const color = require('colors')

const success = function (props) {

    let sucpr = [
        color.black(' ' + props.name + ' ').bgGreen.bold,
        color.green(props.message)
    ]

    this.print = function () {
        msg(sucpr, {
            borderColor: 'green'
        })
    }

    return this
}

const error = function(props){

    let errpr = [
        color.white(' '+props.name+' ').bgRed.bold,
        color.red(props.message),
        color.green(props.resolve)
    ]

    this.print = function(){
        msg(errpr,{
            borderColor: 'red'
        })
    }

    return this
}

const message = function(){

    this.success = function () {
        return success
    }

    this.error = function(){
        return error
    }

    return this
}

module.exports = message()