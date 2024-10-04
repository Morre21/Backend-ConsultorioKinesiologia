import 'reflect-metadata'
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import express from 'express'
import { pacienteRouter } from './paciente/paciente.routes.js';
import { secretariaRouter } from './secretaria/secretaria.routes.js';
import { kinesiologoRouter } from './kinesiologo/kinesiologo.routes.js';
import { turnoRouter } from './turnos/turno.routes.js';
import { consultorioRouter } from './consultorio/consultorio.routes.js';
import { precioRouter } from './precio/precio.routes.js';
import { tipoatencionRouter } from './tipoAtencion/ta.routes.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;
//luego de los middlewares base

app.use((req, res, next) => {
  RequestContext.create(orm.em, next) // em (Entity Manager)
})
//antes de las rutas y middlewares de negocio

app.use ('/api/turnos', turnoRouter)
app.use ('/api/kinesiologos', kinesiologoRouter)
app.use('/api/secretarias', secretariaRouter)
app.use('/api/secretarias/consultorios', consultorioRouter)
app.use('/api/pacientes', pacienteRouter)
app.use('/api/tiposDeAtencion', tipoatencionRouter)
app.use('/api/precios', precioRouter)

app.use((req, res) => {
return res.status(404).send({message: 'Ruta no encontrada'});
});

await syncSchema() //never in production

app.listen(PORT, () => {
  console.log('Server is running on http://localhost ${PORT}`);
});