const { Router } = require('express');
const { createMateria,
        deleteMateria,
        getMateriaById,
        getMaterias,
        updateMateria } = require('../controllers/materia');

const router = Router(); 

router.get('/', getMaterias );
router.get('/:id', getMateriaById );
router.post('/', createMateria );
router.put('/:id', updateMateria );
router.delete('/:id', deleteMateria );

module.exports = router;