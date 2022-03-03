const {
    Router,
    check
} = require('../helpers/requires');

const { buscar } = require('../controllers/buscar');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

router.get('/:coleccion/:termino', buscar)


module.exports = router;