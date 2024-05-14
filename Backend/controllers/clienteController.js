const { Cliente : ClienteModel, Cliente } = require("../models/clientes");

const clienteController = {
    //ADICIONAR 
    create: async(req, res) => {
        try {
            const Cliente = {
            nome: req.body.nome,
            email: req.body.email,
            telemovel: req.body.telemovel,
            }
            const response = await ClienteModeleModel.create(Cliente);

            res.status(201).json({response, msg: "Cliente criado com sucesso!"}); //estado 201 para quando é enviada uma resposta

        } catch (error) {
            console.log(error)
        }
    },
    //LISTAGEM - ALL
    getAll: async (req, res) => { //resgate de todos os clientes 
        try {
            const clientes = await ClienteModel.find();

            res.json(clientes);
        } catch (error) {
            console.log(error);
        }
    },
    //LISTAGEM - BY ID
    get: async (req, res) => {
        try {
            const id = req.params.id
            const Cliente = await ClienteModel.findById(id);

            if(!Cliente) {
                res.status(404).json({msg: "Cliente não encontrado"});
                return;
            }

            res.json(Cliente);
        } catch (error) {
            console.log(error)
        }
    },
    //APAGAR - BY ID
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const Cliente = await ClienteModel.findById(id);

            if(!Cliente) {
                res.status(404).json({msg: "Cliente não encontrado"});
                return;
            }

            const deletedCliente = await ClienteModel.findByIdAndDelete(id);

            res.status(200).json({deletedCliente, msg: "Cliente excluído com Sucesso"}); //Exclusões

        } catch (error) {
            console.log(error);
        }
    },
    //ATUALIZAR - BY ID
    update: async (req, res) => {

        const id = req.params.id;

        const Cliente = {
            nome: req.body.nome,
            email: req.body.email,
            telemovel: req.body.telemovel,
        };

        const updatedCliente = await ClienteModel.findByIdAndUpdate(id, Cliente)

        if(!updatedCliente) {
            res.status(404).json({msg: "Cliente não encontrado"});
            return;
        }

        res.status(200).json({Cliente, msg: "Cliente atualizado com sucesso!"})
    },
};

module.exports = ClienteController;