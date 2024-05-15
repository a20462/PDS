const { Carro : CarroModel, Carro } = require("../models/carros");

const carroController = {
    //ADICIONAR x
    create: async(req, res) => {
        try {
            const carro = {
            marca: req.body.marca,
            modelo: req.body.modelo,
            kms: req.body.kms,
            combustivel: req.body.combustivel,
            ano: req.body.ano,
            caixa: req.body.caixa,
            img: req.body.img,
            garantia: req.body.garantia,
            preco: req.body.preco,
            cor: req.body.cor,
            }
            const response = await CarroModel.create(carro);

            res.status(201).json({response, msg: "Carro criado com sucesso!"}); //estado 201 para quando é enviada uma resposta

        } catch (error) {
            console.log(error)
        }
    },
    //LISTAGEM - ALL x
    getAll: async (req, res) => { //
        try {
            const carros = await CarroModel.find();

            res.json(carros);
        } catch (error) {
            console.log(error);
        }
    },
    //LISTAGEM - BY ID x
    get: async (req, res) => {
        try {
            const id = req.params.id
            const carro = await CarroModel.findById(id);

            if(!carro) {
                res.status(404).json({msg: "Carro não encontrado"});
                return;
            }

            res.json(carro);
        } catch (error) {
            console.log(error)
        }
    },
    //APAGAR - BY ID x
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const carro = await CarroModel.findById(id);

            if(!carro) {
                res.status(404).json({msg: "Carro não encontrado"});
                return;
            }

            const deletedCarro = await CarroModel.findByIdAndDelete(id);

            res.status(200).json({deletedCarro, msg: "Carro excluído com Sucesso"}); //Exclusões

        } catch (error) {
            console.log(error);
        }
    },
    //ATUALIZAR - BY ID x
    update: async (req, res) => {

        const id = req.params.id;

        const carro = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        kms: req.body.kms,
        combustivel: req.body.combustivel,
        ano: req.body.ano,
        caixa: req.body.caixa,
        img: req.body.img,
        garantia: req.body.garantia,
        preco: req.body.preco,
        cor: req.body.cor,
        }

        const updatedCarro = await CarroModel.findByIdAndUpdate(id, carro)

        if(!updatedCarro) {
            res.status(404).json({msg: "Carro não encontrado"});
            return;
        }

        res.status(200).json({carro, msg: "Carro atualizado com sucesso!"})
    },
};

module.exports = carroController;