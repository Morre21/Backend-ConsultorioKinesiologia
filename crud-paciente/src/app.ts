import express, {NextFunction, Request, Response} from 'express'
import { Paciente } from  './paciente.js' 
import {it} from 'node:test'

const app = express();

app.use(express.json());

const pacientes = [
  new Paciente (
    'Facundo',
    'Morresi',
    '45864009',
    '24/11/2003',
    'OSDE',
    'facumorresi@yahoo.com.ar',
    'facumorresi',
    'activo',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
];

function sanitizeCharacterInput(req: Request, _res: Response, next: NextFunction) {
 if (typeof req.body === 'object' && req.body !== null) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    pacienteClass: req.body.pacienteClass,
    dni: req.body.dni,
    fechaNacimiento: req.body.fechaNacimiento,
    obraSocial: req.body.obraSocial,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password,
    estado: req.body.estado,
  }


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
}
  next()
}


app.get('/api/pacientes/:id', (req, res) => {
  const paciente = pacientes.find((paciente) => paciente.id === req.params.id);
  if (!paciente) {
    return res.status(404).json({message: 'Paciente no encontrado'});
  }
  res.json ({data: paciente});
});

app.post('/api/pacientes', sanitizeCharacterInput, (req, res) => {
  const paciente = new Paciente(
    req.body.sanitizedInput.nombre,
    req.body.sanitizedInput.apellido,
    req.body.sanitizedInput.dni,
    req.body.sanitizedInput.fechaNacimiento,
    req.body.sanitizedInput.obraSocial,
    req.body.sanitizedInput.telefono,
    req.body.sanitizedInput.email,
    req.body.sanitizedInput.password,
    req.body.sanitizedInput.estado
  );
  pacientes.push(paciente);
 return res.status(201).send({message: 'Paciente creado', data: paciente});
});

app.put('/api/pacientes/:id', sanitizeCharacterInput, (req, res) => {
  const pacienteIdx = pacientes.findIndex((paciente) => paciente.id === req.params.id);
  if (pacienteIdx === -1) {
    return res.status(404).send({message: 'Paciente no encontrado'});
  }
   pacientes[pacienteIdx] = { ...pacientes[pacienteIdx], ...req.body.sanitizedInput }

  return res.status(200).send({ message: 'paciente actualizado correctamente', data: pacientes[pacienteIdx] })
})

app.delete('/api/pacientes/:id', (req, res) => {
  const pacienteIdx = pacientes.findIndex((paciente) => paciente.id === req.params.id);
  if (pacienteIdx === -1) {
    return res.status(404).send({message: 'Paciente no encontrado'});
  }
  pacientes.splice(pacienteIdx, 1);
  return res.status(200).send({message: 'Paciente eliminado correctamente'});
});

app.use((_req, res) => {
return res.status(404).send({message: 'Ruta no encontrada'});
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});
