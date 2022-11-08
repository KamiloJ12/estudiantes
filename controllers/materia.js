const { request, response } = require('express');
const Materia = require('../models/materias');

const getMaterias = async ( req = request, res = response ) => {
    try {
        const materias = await Materia.find();

        res.status(200).json({
            body: { materias }
        });

    } catch (error) {
        res.status(500).json( { msg:'Ocurrio un error', error} );
    }   
}

const getMateriaById = async ( req = request, res = response ) => {
    try {
        const { params: { id } } = req;
    
        const materia = await Materia.findOne( { id: id } );
        
        res.status(200).json({
            body: { materia }
        });

    } catch (error) {
        res.status(500).json( { msg:'Ocurrio un error', error} );
    }
}

const createMateria = async ( req = request, res = response ) => {
    try {
        const { id, nombre_materia, semestre, carrera } = req.body;
        const data = { id, nombre_materia, semestre, carrera };
        const materia = new Materia( data );
        await materia.save();

        res.status(201).json( materia );
    } catch ( error ) {
        res.status(500).json( { msg:'Ocurrio un error', error} );
    }
}

const updateMateria = async ( req = request, res = response ) => {
    try{ 
        const { params: { id } } = req;
        const { nombre_materia, semestre, carrera } = req.body;

        const data = { nombre_materia, semestre, carrera };
        
        const materia = await Materia.findOneAndUpdate( { id }, data, { new: true } );

        res.status(200).json({
            materia
        });
    } catch ( error ) {
        res.status(500).json( { msg:'Ocurrio un error', error} );
    } 
}

const deleteMateria = async ( req = request, res = response ) => {
    try{
        const { params: { id } } = req;
        const materia = await Materia.deleteOne( { id } );
        res.status(200).json({
            materia
        });
    } catch ( error ) {
        res.status(500).json( { msg:'Ocurrio un error', error} );
    }
}

module.exports = {
    createMateria,
    deleteMateria,
    getMateriaById,
    getMaterias,
    updateMateria
}