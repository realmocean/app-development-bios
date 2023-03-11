var shell = require('shelljs');
const tuval = require('@tuval/core/node');
const path = require('path');
const fs = require('fs');

shell.exec('export NODE_OPTIONS="--max-old-space-size=9192"');

if (shell.exec('npm run buildweb').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}


const fileName = './dist_web/index.js';
const fileName1 = './dist_web/enterprise.bios';


const a = fs.readFileSync(fileName);
const bytes = tuval.TCompress.CompressBytes(a);

fs.writeFileSync(fileName1, bytes);





shell.cp('-Rf', './dist_web/enterprise.bios', './public');
shell.cp('-Rf', './dist_web/index.js', './public');
shell.cp('-Rf', './dist_web/index.js', '../realm-runtime/src/portal/static/bios/app-development-bios.js');

