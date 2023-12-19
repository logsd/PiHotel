const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const {mongoose} =require('./database');
// Settings
app.set('port',process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
//Routes
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/habitacion',require('./routes/habitacion.routes'));
app.use('/api/reserva',require('./routes/reserva.routes'));
app.use('/api/metodo',require('./routes/metodo.pago.routes'));
app.use('/api/producto',require('./routes/producto.routes'));
app.use('/api/consumo',require('./routes/consumo.routes'));

//Starting the server

app.listen(app.get('port'), ()=>{
    console.log('listening on port', app.get('port'));
});