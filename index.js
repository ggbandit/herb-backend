var packageJson = require('./package.json')
var app = require('./app')

var port = 5000;
app.listen(port, () => {
    console.info(packageJson.name + ' is listening on port ' + port)
})