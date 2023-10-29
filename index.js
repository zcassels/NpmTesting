const { Arborist } = require('@npmcli/arborist');
const log = require('./node_modules/npm/lib/utils/log-shim');

const Npm = require('./node_modules/npm/lib/npm')
const npm = new Npm()
const Config = require('./lib/testcmd')

npm.load().then(v => {
    const setCmd = new Config(npm);
    const args = process.argv.slice(2);
    setCmd.cmdExec(args).finally(null)
    
    console.log("")
})

