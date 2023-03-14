const {Router} =require('express')
const productController = require('../controller/productController')

const router = Router()

// ===== Rotas de Produtos ======
router.post('/products', productController.saveOrUpdate)
router.get('/products', productController.findAllProduct)
router.put('/products', productController.saveOrUpdate)
router.get('/products/:id', productController.findId)


module.exports = router
