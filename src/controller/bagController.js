const { existsOrError } = require('../validations/validations')
const { Product } = require('../models/product')
const Bag = require("../models/bag")

const save = async (req, res) => {
    
    try {
        const bag = {...req.body} 
       
       let diponiveis = []
       let naoDisponiveis = []
       let precoTotal = 0
       // Verificar se os produtos estão disponíveis;
       const list = bag.productItens
       
       list.map((item => {
        
            if(item.products.avaliable && item.quantity > 0){
                
                diponiveis.push(item)
            }else {
                naoDisponiveis.push(item)
            }
        }))

        // Calcula preço Total dos itens disponíveis
        diponiveis.map(item => {
            let valorPorUnidade = item.quantity * item.products.price
            precoTotal+= valorPorUnidade
        })

        bag.productItens = diponiveis
        bag.priceTotal = precoTotal
        //console.log(bag.productItens);
        //console.log(precoTotal);
        if(bag.productItens.length > 0 && bag.priceTotal > 0){
            const responsedb = await Bag.create(bag)
            res.status(200).json({ Sucess:  bag.productItens, Erro: naoDisponiveis })
        } 

    } catch (error) {
        res.status(500).send(error)
    }   
}

const findAllBag = async (req, res) => {
    const { page = 1, size = 5 } = req.query

    if (page <= 0) return res.status(400).json({ message: "Página inválida!" })

    try {
        let skip = size * (page - 1)
        const list = await Bag.find({}).skip(skip).limit(size).exec()
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json(error)
    }
}






module.exports = { save, findAllBag }