const mongoose = require("mongoose")

async function main() {
    try {

        mongoose.set("strictQuery", true);
        
        await mongoose.connect(
            "mongodb+srv://a20461:scfautos14@teste.cdtznh1.mongodb.net/?retryWrites=true&w=majority&appName=teste"
        );

        console.log("Ligado na DB!")
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main