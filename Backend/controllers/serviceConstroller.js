const { Service : ServiceModel, Service } = require("../models/service");

const serviceController = {
    //ADICIONAR 
    create: async(req, res) => {
        try {
            const service = {
            tipo: req.body.tipo,
            nome: req.body.nome,
            email: req.body.email,
            telemovel: req.body.telemovel,
            estado: req.body.estado,
            modelo: req.body.modelo,
            conta: req.body.conta,
            }
            const response = await ServiceModel.create(service);

            res.status(201).json({response, msg: "Servico criado com sucesso!"}); //estado 201 para quando é enviada uma resposta

        } catch (error) {
            console.log(error)
        }
    },
    //LISTAGEM - ALL
    getAll: async (req, res) => { //resgate de todos os serviços 
        try {
            const services = await ServiceModel.find();

            res.json(services);
        } catch (error) {
            console.log(error);
        }
    },
    //LISTAGEM - BY ID
    get: async (req, res) => {
        try {
            const id = req.params.id
            const service = await ServiceModel.findById(id);

            if(!service) {
                res.status(404).json({msg: "Serviço não encontrado"});
                return;
            }

            res.json(service);
        } catch (error) {
            console.log(error)
        }
    },
    //APAGAR - BY ID
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceModel.findById(id);

            if(!service) {
                res.status(404).json({msg: "Serviço não encontrado"});
                return;
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id);

            res.status(200).json({deletedService, msg: "Serviço excluído com Sucesso"}); //Exclusões

        } catch (error) {
            console.log(error);
        }
    },
    //ATUALIZAR - BY ID
    update: async (req, res) => {

        const id = req.params.id;

        const service = {
            tipo: req.body.tipo,
            nome: req.body.nome,
            email: req.body.email,
            telemovel: req.body.telemovel,
            estado: req.body.estado,
            modelo: req.body.modelo,
            conta: req.body.conta,
        };

        const updatedService = await ServiceModel.findByIdAndUpdate(id, service)

        if(!updatedService) {
            res.status(404).json({msg: "Serviço não encontrado"});
            return;
        }

        res.status(200).json({service, msg: "Serviço atualizado com sucesso!"})
    },
};

module.exports = serviceController;