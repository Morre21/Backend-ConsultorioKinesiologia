import express from 'express'
import { pacienteRouter } from './paciente/paciente.routes.js';
import { secretariaRouter } from './secretaria/secretaria.routes.js';
import { kinesiologoRouter } from './kinesiologo/kinesiologo.routes.js';
import { turnoRouter } from './turnos/turno.routes.js';


const app = express();
app.use(express.json());

app.use ('/api/turnos', turnoRouter)
app.use ('/api/kinesiologos', kinesiologoRouter)
app.use('/api/secretarias', secretariaRouter)
app.use('/api/pacientes', pacienteRouter)

app.use((_req, res) => {
return res.status(404).send({message: 'Ruta no encontrada'});
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});