import { Paciente } from "./paciente.entity.js";
const pacientes = [
    new Paciente('Facundo', 'Morresi', '45864008', '24/11/2003', 'OSDE', 'facumorresi@yahoo.com.ar', 'facumorresi', 'activo', 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
export class PacienteRepository {
    findAll() {
        return pacientes;
    }
    findOne(item) {
        return pacientes.find((paciente) => paciente.id === item.id);
    }
    add(item) {
        pacientes.push(item);
        return item;
    }
    update(item) {
        const pacienteIdx = pacientes.findIndex((paciente) => paciente.id === item.id);
        if (pacienteIdx !== -1) {
            pacientes[pacienteIdx] = { ...pacientes[pacienteIdx], ...item };
        }
        return pacientes[pacienteIdx];
    }
    delete(item) {
        const pacienteIdx = pacientes.findIndex((paciente) => paciente.id === item.id);
        if (pacienteIdx !== -1) {
            const deletedPacientes = pacientes[pacienteIdx];
            pacientes.splice(pacienteIdx, 1);
            return deletedPacientes;
        }
    }
}
//# sourceMappingURL=paciente.repository.js.map