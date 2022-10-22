const { Router } = require('express');
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPath,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete);
router.delete('/', usuariosPath);

module.exports = router;
