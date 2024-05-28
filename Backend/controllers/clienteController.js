const Cliente = require('../models/cliente');


const clienteController = {
    //ADICIONAR 
    create: async(req, res) => {
        try {
            const cliente = {
            nome: req.body.nome,
            email: req.body.email,
            date: req.body.date,
            telemovel: req.body.telemovel,
            nif: req.body.nif,
            }
            const response = await Cliente.create(cliente);

            res.status(201).json({response, msg: "Cliente criado com sucesso!"});

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
            const cliente = await ClienteModel.findById(id);

            if(!cliente) {
                res.status(404).json({msg: "Cliente não encontrado"});
                return;
            }

            res.json(cliente);
        } catch (error) {
            console.log(error)
        }
    },
    //APAGAR - BY ID
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const cliente = await ClienteModel.findById(id);

            if(!cliente) {
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

        const cliente = {
            nome: req.body.nome,
            email: req.body.email,
            date: req.body.date,
            telemovel: req.body.nome,
            nif: req.body.nif,
        };

        const updatedCliente = await ClienteModel.findByIdAndUpdate(id, cliente)

        if(!updatedCliente) {
            res.status(404).json({msg: "Cliente não encontrado"});
            return;
        }

        res.status(200).json({cliente, msg: "Cliente atualizado com sucesso!"})
    },
};

module.exports = clienteController;