#!/usr/bin/env node

const cli = require('commander')
const env = require('./environment')
const db  = require('./lib/database')

cli
    .version('Hambase@'+env.version)
    .description('Realtime NoSQL Database')

cli
    .command('new <database>')
    .description('Create new database file')
    .action((database)=>{
        db.create(database)
    })

cli.parse(process.argv)