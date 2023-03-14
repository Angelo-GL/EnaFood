const { existsOrError } = require('../validations/validations')
const { Product } = require('../models/product')

const saveOrUpdate = async (req, res) => {
    const product = { ...req.body }
    if (req.params.id) product.id = req.params.id

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

        if (product._id) {
            const response = await Product.findById(product._id).exec()

            if (!response) {
                return res.status(422).json({ message: "Nenhum Produto encontrado!" })
            } else {
                const postUpdate = await Product.updateOne({ _id: product._id }, product)
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
    const { page = 1, size = 5 } = req.query

    if (page <= 0) return res.status(400).json({ message: "Página inválida!" })

    try {
        let skip = size * (page - 1)
        const list = await Product.find({}).skip(skip).limit(size).exec()
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json(error)
    }
}

const findId = async (req, res) => {
    try {

        const response = await Product.findById(req.params.id).exec()
        if (response) {
            return res.status(200).json(response)
        }

        res.status(422).json({ message: "Produto não Encontrado" })
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id

    try {
        const responseDB = await Product.findOne({ _id: id })

        if(!responseDB) return res.status(422).json({ message: "Produto não encontrado! " })

        await Product.deleteOne({_id: id})
        res.status(200).json({ message: "Produto Excluido!" })

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { saveOrUpdate, findAllProduct, findId, deleteProduct }
