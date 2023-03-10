const {Router} =require('express')
const productController = require('../controller/productController')

const router = Router()

// ===== Rotas de Produtos ======
router.post('/products', productController.saveOrUpdate)
router.get('/products', productController.findAllProduct)


module.exports = router
