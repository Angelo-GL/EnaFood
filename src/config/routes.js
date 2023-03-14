const { Router } =require('express')
const productController = require('../controller/productController')
const bagController = require('../controller/bagController')


const router = Router()

// ===== Rotas de Produtos ======
router.post('/products', productController.saveOrUpdate)
router.get('/products', productController.findAllProduct)
router.put('/products', productController.saveOrUpdate)
router.get('/products/:id', productController.findId)
router.delete('/products/:id', productController.deleteProduct)
router.post('/bag', bagController.save)
router.get('/bag', bagController.findAllBag )
router.delete('/bag/:id', bagController.deleteBag)
router.get('/bag/:id', bagController.findByIdBag)


module.exports = router
