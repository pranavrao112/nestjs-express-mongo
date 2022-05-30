// Used for testing DB connection

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/NESTJS_MONGO_DEMO')
.then( () => console.log('DB Connected!'))
.catch( (err) => console.log(err));