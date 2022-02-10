const express = require('express'); 
const app = express();
const path = require('path')

//servir la página estáticamente

app.use(express.static(__dirname + '/public'));

//Settings
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));

//Start the server
app.listen(app.get('port'), ()=> {
    console.log(`Server listening on port ${app.get('port')}`);
}); 