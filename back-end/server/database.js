const mongoose = require('mongoose');

var URI = "mongodb://localhost:27017/yavi-elec";

mongoose.connect(URI)
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));




module.exports = mongoose;