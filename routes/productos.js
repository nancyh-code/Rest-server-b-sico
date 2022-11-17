const { Router } = require('express');
const { check } = require('express-validator');
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require('../controllers/productos');
const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las productos - publico
router.get('/', obtenerProductos);

//Obtener todas las productos por id - publico
router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//Crear productos - privado -cualquier persona con un token válido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar - privado -cualquier persona con un token válido
router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar una categoria -Admin
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
