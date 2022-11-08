const { model, Schema } = require('mongoose');

const EstudianteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        require: [true, 'El apellido es requerido']
    },
    email: {
        type: String,
        require: [true, 'El email es requerido'],
        unique: true
    },
    sexo: {
        type: String,
        enum : ['hombre','mujer'],
        require: [true, 'El sexo es requerido']
    },
    materias: {
        type: [Schema.Types.ObjectId],
        ref: 'Materia',
        required: [true, 'Las materias son requreidas']
    }
});

EstudianteSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    if( data.sexo == 'hombre' ){
        data.sexo = 'Soy un hombre';
    }else {
        data.sexo = 'Soy una mujer';
    }
    data.full_name = `${data.nombre} ${data.apellido}`;
    return data;
}

module.exports = model('Estudiante', EstudianteSchema);
