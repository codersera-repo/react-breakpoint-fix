const exec = require('child_process').exec;
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
replaceFileContent(path.resolve(__dirname, '../react-scripts/config/webpack.config.js'), regex, 'eval-source-map');

packageFile.scripts.postinstall = 'patch-package';
packageFile.dependencies['patch-package'] = packageFile.dependencies['patch-package'] || "^6.1.2";
packageFile.scripts['patch-react-scripts'] = 'patch-package react-scripts';

fs.writeFileSync(path.resolve(__dirname, '../../package.json'), JSON.stringify(packageFile, null, '\t'));
