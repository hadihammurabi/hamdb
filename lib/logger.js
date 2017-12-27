const fs = require('fs')
const success = require('./message').success()

const logger = function() {
    this.write = function(txt){
        let now = new Date()
        let formattednow = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()

        if (fs.existsSync(process.hamdb.name+'.log')){
            let data = fs.readFileSync(process.hamdb.name+'.log','utf8')
            data += '\n'
            data += '['+formattednow+'] '+txt
            txt = data
        }else{
            txt = '[' + formattednow + '] ' + txt
        }
        
        fs.writeFileSync(process.hamdb.name+'.log', txt)
    }

    this.clean = function(){
        if (fs.existsSync(process.hamdb.name+'.log')) {
            fs.writeFileSync(process.hamdb.name + '.log', '')
        }
        success({
            name:'LOGCLEAN',
            message:'Log file has been cleared'
        }).print()
    }

    return this
}

module.exports = logger()