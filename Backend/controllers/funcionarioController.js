const { Funcionario : FuncionarioModel, Funcionario } = require("../models/funcionario");

const funcionarioController = {
    //ADICIONAR 
    create: async(req, res) => {
        try {
            const funcionario = {
                nome: req.body.nome,
                datanasc: req.body.datanasc,
                nif: req.body.nif,
                iban: req.body.iban,
                telemovel: req.body.telemovel,
            }
            const response = await FuncionarioModel.create(funcionario);

            res.status(201).json({response, msg: "Funcionario criado com sucesso!"}); //estado 201 para quando é enviada uma resposta

        } catch (error) {
            console.log(error)
        }
    },
    //LISTAGEM - ALL
    getAll: async (req, res) => { //resgate de todos os Funcionarios 
        try {
            const funcionarios = await FuncionarioModel.find();

            res.json(funcionarios);
        } catch (error) {
            console.log(error);
        }
    },
    //LISTAGEM - BY ID
    get: async (req, res) => {
        try {
            const id = req.params.id
            const funcionario = await FuncionarioModel.findById(id);

            if(!funcionario) {
                res.status(404).json({msg: "Funcionario não encontrado"});
                return;
            }

            res.json(funcionario);
        } catch (error) {
            console.log(error)
        }
    },
    //APAGAR - BY ID
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const funcionario = await FuncionarioModel.findById(id);

            if(!funcionario) {
                res.status(404).json({msg: "Funcionario não encontrado"});
                return;
            }

            const deletedFuncionario = await FuncionarioModel.findByIdAndDelete(id);

            res.status(200).json({deletedFuncionario, msg: "Funcionario excluído com Sucesso"}); //Exclusões

        } catch (error) {
            console.log(error);
        }
    },
    //ATUALIZAR - BY ID
    update: async (req, res) => {

        const id = req.params.id;

        const funcionario = {
            nome: req.body.nome,
            datanasc: req.body.datanasc,
            nif: req.body.nif,
            iban: req.body.iban,
            telemovel: req.body.telemovel,
        };

        const updatedFuncionario = await FuncionarioModel.findByIdAndUpdate(id, funcionario)

        if(!updatedFuncionario) {
            res.status(404).json({msg: "Funcionario não encontrado"});
            return;
        }

        res.status(200).json({Funcionario, msg: "Funcionario atualizado com sucesso!"})
    },
};

module.exports = funcionarioController;