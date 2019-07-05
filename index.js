#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const regex = /cheap-module-source-map/g;

const packageFile = require(path.resolve(__dirname, '../../package.json'));
function replaceFileContent(fileName, oldNameRegex, newName) {
    console.log(`${fileName} parsing file`);

    let fileContent = fs.readFileSync(fileName, 'utf8');
    fileContent = fileContent.replace(oldNameRegex, newName);
    fs.writeFileSync(fileName, fileContent);
    console.log(`${fileName} updated successfully`);
}

packageFile.dependencies['patch-package'] = packageFile.dependencies['patch-package'] || "^6.1.2";
packageFile.scripts['patch-react-scripts'] = 'patch-package react-scripts';
fs.writeFileSync(path.resolve(__dirname, '../../package.json'), JSON.stringify(packageFile, null, '\t'));

console.log('installing patch-package, please wait, might take some time.');
execSync('npm install patch-package@6.1.2 --save',
    {stdio: 'inherit'});

packageFile.scripts.postinstall = 'patch-package';
replaceFileContent(path.resolve(__dirname, '../react-scripts/config/webpack.config.js'), regex, 'eval-source-map');

fs.writeFileSync(path.resolve(__dirname, '../../package.json'), JSON.stringify(packageFile, null, '\t'));
console.log('patching your packages, please wait');
execSync('patch-package react-scripts',
    {stdio: 'inherit'});
console.log('Done! React breakpoint issues should have been sorted by now.');