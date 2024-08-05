const app = require('./src/application');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log("Server Start");
});