const fs = require('fs');
const path = require('path');
const regex = /cheap-module-source-map/g;

function replaceFileContent(fileName, oldNameRegex, newName) {
    console.log(`${fileName} parsing file`);
    let fileContent = fs.readFileSync(fileName, 'utf8');

    fileContent = fileContent.replace(oldNameRegex, newName);
    fs.writeFileSync(fileName, fileContent);
    console.log(`${fileName} updated successfully`);
}

replaceFileContent(path.resolve(__dirname, './node_modules/react-scripts/config/webpack.config.js'), regex, 'eval-source-map');