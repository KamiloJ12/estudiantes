const { request, response } = require('express');
const Estudiante = require('../models/estudiante');

const getEstudiantes = async ( req = request, res = response ) => {
    try {
        const estudiantes = await Estudiante.find().populate('materias');

        res.status(200).json({
            body: { estudiantes }
        });

    } catch (err) {
        res.status(500).json( { msg:'Ocurrio un error', err} );
    }   
}

const getEstudianteById = async ( req = request, res = response ) => {
    try {
        const { params: { id } } = req;
    
        const estudiante = await Estudiante.findOne( { _id: id } ).populate('materias');
        
        res.status(200).json({
            body: { estudiante }
        });

    } catch (err) {
        res.status(500).json( { msg:'Ocurrio un error', err} );
    }
}

const getEstudianteByEmail = async ( req = request, res = response ) => {
    try {
        const { params: { email } } = req;
    
        const estudiante = await Estudiante.findOne( { email: email } ).populate('materias');
        
        res.status(200).json({
            body: { estudiante }
        });

    } catch (err) {
        res.status(500).json( { msg:'Ocurrio un error', err} );
    }
}

const createEstudiante = async ( req = request, res = response ) => {
    try {
        const { nombre, apellido, email, sexo, materias } = req.body;
        const estudianteDB = await Estudiante.findOne({email});
        
        if( estudianteDB ){
            return res.status(400).json({
                msg: `ya esta registrado el correo ${estudianteDB.email}`
            });
        }

        const data = { nombre, apellido, email, sexo, materias };
        const estudiante = new Estudiante( data );
        await estudiante.save();

        res.status(201).json( estudiante );
    } catch ( error ) {
        res.status(500).json( { msg:'Ocurrio un error', error} );
    }
}

const updateEstudiante = async ( req = request, res = response ) => {
    try{
        const { params: { id } } = req;
        const { nombre, apellido, email, sexo } = req.body;

        const data = { nombre, apellido, email, sexo};
        
        const estudiante = await Estudiante.findByIdAndUpdate( id, data, { new: true } ).populate('materias');;

        res.status(200).json({
            estudiante
        });
    } catch ( error ) {
        res.status(500).json( { msg:'Ocurrio un error', error } );
    }
}

const deleteEstudiante = async ( req = request, res = response ) => {
    try{
        const { params: { id } } = req;
        const estudiante = await Estudiante.deleteOne( { _id: id } ).populate('materias');;
        res.status(200).json({
            estudiante
        });
    } catch ( error ) {
        res.status(500).json( { msg:'Ocurrio un error', err} );
    }
}

module.exports = {
    createEstudiante,
    deleteEstudiante,
    getEstudianteById,
    getEstudiantes,
    updateEstudiante,
    getEstudianteByEmail
}