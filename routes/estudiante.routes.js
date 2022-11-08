const { Router } = require('express');
const { createEstudiante,
        deleteEstudiante,
        getEstudianteById,
        getEstudiantes, 
        updateEstudiante,
        getEstudianteByEmail } = require('../controllers/estudiante');

const router = Router(); 

router.get('/', getEstudiantes );
router.get('/:id', getEstudianteById );
router.get('/email/:email', getEstudianteByEmail );
router.post('/', createEstudiante );
router.put('/:id', updateEstudiante );
router.delete('/:id', deleteEstudiante );

module.exports = router;