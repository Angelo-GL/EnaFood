const { existsOrError } = require('../validations/validations')
const { Product } = require('../models/product')

const saveOrUpdate = async (req, res) => {
    const product = { ...req.body }

    if(req.params.id) product.id = req.params.id

    try {
        existsOrError(product.name, "[Err] Nome do produto não informado!")
        existsOrError(product.descriptions, "[Err] Descrição do produto não informado!")
        existsOrError(product.price, "[Err] Preço do produto não informado!")
        existsOrError(product.image, "[Err] Imagem do produto não informado!")
        existsOrError(product.image, "[Err] Imagem do produto não informado!")

    } catch (msg) {
        return res.status(400).send(msg)
    }

    try {

        if(product.id) {
            const response = await Product.findById(product.id).exec()

            if (!response) {
                return res.status(401).json({ message: "Nenhum Produto encontrado!" })
            } else {
                const postUpdate = await Product.update({ _Id: ObjectId(product.id), product})
                res.status(200).json({ message: "Atualização concluida!" })
            }
        } else {
            await Product.create(product)
            res.status(200).json({ message: "Cadastro concluido!" })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

const findAllProduct = async (req, res) => {
    const { page = 0, size = 5 } = req.query
    
        
    try {
        let skip = size * (page - 1)
        const list = await Product.find({}).skip(skip).limit(size).exec()
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json(error)
    }
    
}

module.exports = { saveOrUpdate }
