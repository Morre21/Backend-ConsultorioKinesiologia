import { Turno } from "./turno.entity.js";
import { orm } from '../shared/db/orm.js';
import { Consultorio } from "../consultorio/consultorio.entity.js";
import { Especialidad } from "../especialidad/especialidad.entity.js";
import { Kinesiologo } from "../kinesiologo/kinesiologo.entity.js";
import { Disponibilidad } from "../disponibilidad/dispo.enitity.js";
import { Precio } from "../precio/precio.entity.js";
const em = orm.em;
function sanitizeTurnoInput(req, res, next) {
    req.body.sanitizedInput = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        estado: req.body.estado,
        importeTotal: req.body.importeTotal,
        paciente: req.body.paciente,
        kinesiologo: req.body.kinesiologo,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const turnos = await em.find(Turno, {}, { populate: ['paciente', 'kinesiologo'] });
        res.status(200).json({ message: 'Todos los turnos encontrados', data: turnos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const turno = await em.findOneOrFail(Turno, { id }, { populate: ['paciente', 'kinesiologo'] });
        res.status(200).json({ message: 'Turno encontardo con exito', data: turno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const { fecha, hora, kinesiologo } = req.body.sanitizedInput;
        const existeTurno = await em.findOne(Turno, { fecha, hora, kinesiologo });
        if (existeTurno) {
            res.status(400).json({ message: 'Ya existe un turno para ese kinesiologo en ese horario' });
            return;
        }
        const turno = em.create(Turno, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Turno creado exitosamente', data: turno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const turnoToUpdate = await em.findOneOrFail(Turno, { id });
        em.assign(turnoToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Turno modificado exitosamente', data: turnoToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const turno = em.getReference(Turno, id);
        await em.removeAndFlush(turno);
        res.status(200).send({ message: 'Turno borrado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function creacionTurno(req, res) {
    try {
        switch (req.body.action) {
            case 'consultorios':
                const consultorios = await orm.em.find(Consultorio, {}, { populate: ['Kinesiologos'] });
                if (!consultorios)
                    return res.status(404).json({ error: 'No se encontraron consultorios' });
                return res.json(consultorios);
            case 'especialidades':
                // Obtener todas las especialidades sin filtrar por consultorio
                const especialidades = await orm.em.find(Especialidad, {});
                if (!especialidades)
                    return res.status(404).json({ error: 'No se encontraron especialidades' });
                return res.json(especialidades);
            case 'kinesiologos':
                if (!req.body.especialidadId || !req.body.consultorioId) {
                    return res.status(400).json({ error: 'Debe proporcionar especialidadId y consultorioId' });
                }
                const kinesiologos = await orm.em.find(Kinesiologo, {
                    especialidad: req.body.especialidadId,
                    consultorio: req.body.consultorioId,
                });
                if (!kinesiologos)
                    return res.status(404).json({ error: 'No se encontraron kinesiólogos' });
                return res.json(kinesiologos);
            case 'fechas':
                if (!req.body.fecha || !req.body.kinesiologoId) {
                    return res.status(400).json({ error: 'Debe proporcionar fecha y kinesiologoId' });
                }
                const fecha = new Date(req.body.fecha);
                const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
                // Obtener las disponibilidades del kinesiólogo para el día seleccionado
                const disponibilidades = await orm.em.find(Disponibilidad, {
                    kinesiologo: req.body.kinesiologoId,
                    diaSemana: diaSemana,
                    fechaDesde: { $lte: fecha }
                });
                if (disponibilidades.length === 0) {
                    return res.json({ message: 'No hay disponibilidad para la fecha seleccionada',
                        horariosDisponibles: []
                    });
                }
                // Obtener los turnos ya registrados para el kinesiólogo en la fecha seleccionada
                const turnosRegistrados = await orm.em.find(Turno, {
                    kinesiologo: req.body.kinesiologoId,
                    fecha: fecha,
                });
                // Crear un array con los horarios ocupados para búsqueda eficiente
                const horariosOcupados = turnosRegistrados.map(turno => turno.hora);
                // Generar los horarios disponibles
                const horariosDisponibles = disponibilidades.flatMap(disponibilidad => {
                    const horaInicio = parseInt(disponibilidad.horaInicio.split(':')[0]);
                    const horaFin = parseInt(disponibilidad.horaFin.split(':')[0]);
                    // Crear un array de horarios posibles para cada disponibilidad
                    const horarios = [];
                    for (let hora = horaInicio; hora < horaFin; hora++) {
                        const horario = `${hora.toString().padStart(2, '0')}:00`;
                        horarios.push(horario);
                    }
                    return horarios;
                }).filter(horario => !horariosOcupados.includes(horario));
                if (horariosDisponibles.length === 0) {
                    return res.json({
                        message: 'No hay horarios disponibles para la fecha seleccionada',
                        horariosDisponibles: []
                    });
                }
                return res.json({
                    horariosDisponibles: horariosDisponibles.sort(),
                    intervalos: disponibilidades.map(d => ({
                        diaSemana: d.diaSemana,
                        horaInicio: d.horaInicio,
                        horaFin: d.horaFin
                    }))
                });
            case 'registrarTurno':
                // Buscar la especialidad por nombre
                const especialidad = await orm.em.findOne(Especialidad, { nombre: req.body.especialidadNombre });
                // Verificamos si encontramos la especialidad
                if (!especialidad) {
                    return res.status(400).json({ error: 'Especialidad no encontrada' });
                }
                // Ahora buscamos el precio asociado a la especialidad
                const precio = await orm.em.findOne(Precio, { especialidad, fechaDesde: { $lte: new Date() } }, { populate: ['especialidad'],
                    orderBy: { fechaDesde: 'DESC' }, // Ordenamos por fecha más reciente
                });
                if (!precio) {
                    return res.status(400).json({ error: 'Precio no encontrado para la especialidad' });
                }
                const turno = orm.em.create(Turno, {
                    paciente: req.user?.id,
                    kinesiologo: req.body.kinesiologoId,
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                    estado: 'Activo',
                    importeTotal: precio.importe, // Puedes calcular el importe según la lógica de tu sistema
                });
                // Guardar el turno en la base de datos
                await em.flush();
                return res.json({ message: 'Turno registrado exitosamente', turno });
            default:
                return res.status(400).json({ error: 'Acción no válida' });
        }
    }
    catch (error) {
        console.error('Error en creacionTurno:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}
;
export { sanitizeTurnoInput, findAll, findOne, add, update, remove, creacionTurno };
//# sourceMappingURL=turno.controller.js.map