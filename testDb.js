// Used for testing DB connection

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pranavrao:Pranav112@cluster0.b3tmz.mongodb.net/?retryWrites=true&w=majority')
.then( () => console.log('DB Connected!'))
.catch( (err) => console.log(err));