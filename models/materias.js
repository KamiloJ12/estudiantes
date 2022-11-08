const { model, Schema } = require('mongoose');

const MateriaSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'El id es requerido']
    },
    nombre_materia: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    semestre: {
        type: String,
        required: [true, 'El semestre es requerido']
    },
    semestre: {
        type: String,
        required: [true, 'La carrera es requerida']
    }
});

module.exports = model('Materia', MateriaSchema);