const { Fornecedor : FornecedorModel, Fornecedor } = require("../models/fornecedores");

const fornecedorController = {
    //ADICIONAR 
    create: async(req, res) => {
        try {
            const Fornecedor = {
                Nome: { type: String, required: true },
                NIF: { type: Number, required: true },
                IBAN: { type: Number, required: true },
                Telemovel: { type: Number, required: true }
            }
            const response = await FornecedorModeleModel.create(Fornecedor);

            res.status(201).json({response, msg: "Fornecedor criado com sucesso!"}); //estado 201 para quando é enviada uma resposta

        } catch (error) {
            console.log(error)
        }
    },
    //LISTAGEM - ALL
    getAll: async (req, res) => { //resgate de todos os Fornecedores 
        try {
            const fornecedores = await FornecedorModel.find();

            res.json(fornecedores);
        } catch (error) {
            console.log(error);
        }
    },
    //LISTAGEM - BY ID
    get: async (req, res) => {
        try {
            const id = req.params.id
            const Fornecedor = await FornecedorModel.findById(id);

            if(!Fornecedor) {
                res.status(404).json({msg: "Fornecedor não encontrado"});
                return;
            }

            res.json(Fornecedor);
        } catch (error) {
            console.log(error)
        }
    },
    //APAGAR - BY ID
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const Fornecedor = await FornecedorModel.findById(id);

            if(!Fornecedor) {
                res.status(404).json({msg: "Fornecedor não encontrado"});
                return;
            }

            const deletedFornecedor = await FornecedorModel.findByIdAndDelete(id);

            res.status(200).json({deletedFornecedor, msg: "Fornecedor excluído com Sucesso"}); //Exclusões

        } catch (error) {
            console.log(error);
        }
    },
    //ATUALIZAR - BY ID
    update: async (req, res) => {

        const id = req.params.id;

        const Fornecedor = {
            Nome: { type: String, required: true },
            NIF: { type: Number, required: true },
            IBAN: { type: Number, required: true },
            Telemovel: { type: Number, required: true }
        };

        const updatedFornecedor = await FornecedorModel.findByIdAndUpdate(id, Fornecedor)

        if(!updatedFornecedor) {
            res.status(404).json({msg: "Fornecedor não encontrado"});
            return;
        }

        res.status(200).json({Fornecedor, msg: "Fornecedor atualizado com sucesso!"})
    },
};

module.exports = FornecedorController;