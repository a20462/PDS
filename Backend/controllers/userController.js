const { User : UserModel, User } = require("../models/user");

const userController = {
    //ADICIONAR x
    create: async(req, res) => {
        try {
            const user = {
            userid: req.body.userid,
            password: req.body.password,
            }
            const response = await UserModel.create(user);

            res.status(201).json({response, msg: "Usuário criado com sucesso!"}); //estado 201 para quando é enviada uma resposta

        } catch (error) {
            console.log(error)
        }
    },
    //LISTAGEM - ALL x
    getAll: async (req, res) => { //
        try {
            const users = await UserModel.find();

            res.json(users);
        } catch (error) {
            console.log(error);
        }
    },
    //LISTAGEM - BY ID x
    get: async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id);

            if(!user) {
                res.status(404).json({msg: "Serviço não encontrado"});
                return;
            }

            res.json(user);
        } catch (error) {
            console.log(error)
        }
    },
    //APAGAR - BY ID x
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);

            if(!user) {
                res.status(404).json({msg: "Usuário não encontrado"});
                return;
            }

            const deletedUser = await UserModel.findByIdAndDelete(id);

            res.status(200).json({deletedUser, msg: "Usuário excluído com Sucesso"}); //Exclusões

        } catch (error) {
            console.log(error);
        }
    },
    //ATUALIZAR - BY ID x
    update: async (req, res) => {

        const id = req.params.id;

        const user = {
        userid: req.body.userid,
        password: req.body.password,

        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, user)

        if(!updatedUser) {
            res.status(404).json({msg: "Usuário não encontrado"});
            return;
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso!"})
    },
};

module.exports = userController;