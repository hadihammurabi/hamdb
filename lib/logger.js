const fs = require('fs')
const success = require('./message').success()

const logger = function() {
    this.write = function(txt){
        let now = new Date()
        let formattednow = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()

        if(fs.existsSync('Hambase.log')){
            let data = fs.readFileSync('Hambase.log','utf8')
            data += '\n'
            data += '['+formattednow+'] '+txt
            txt = data
        }else{
            txt = '[' + formattednow + '] ' + txt
        }
        
        fs.writeFileSync('Hambase.log', txt)
    }

    this.clear = function(){
        if (fs.existsSync('Hambase.log')) {
            fs.unlinkSync('Hambase.log')
        }
        success({
            name:'CLEARLOG',
            message:'Log file has been removed'
        }).print()
    }

    return this
}

module.exports = logger()