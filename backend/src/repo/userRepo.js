const Devices = require('../models/devices');
const User = require('../models/users');
const Response = require('../shared/response-model');
const Crypto = require('crypto-js');

class UserRepo{

    static async create(Obj) {
        var response;
        let userWithSameEmail = await this.findByEmail(Obj.email);

        if (userWithSameEmail != null){
            response = new Response(null, true, "User with the same email already exist in the database", 409);
            return response;
        }

        let userName = Obj.name.split(" ");

        let userObj = User.build({
            name: Obj.name,
            userName: userName[0],
            email: Obj.email,
            password: Obj.password,
            uuid: Obj.uuid,
            admin: Obj.admin,
            createdBy: Obj.createdBy
        });

        await User.create(userObj.dataValues)
        .then( (user) => {
            response = new Response(user.toJSON(), false, null, 200);
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            //ToDo: Verificar caso de inserção de uuid não existente na tabela Devices
            response = new Response(null, true, error, 500);
        });
        return response;
    }

    static async findUser(Obj){
        var response;

        await this.findByEmail(Obj.email)
        .then( (user) => {
            if (user != null){
                let loginPassDecrypted = Crypto.AES.decrypt(Obj.password, process.env.ENCRYPTED_SECRET);
                let userPassDecrypted = Crypto.AES.decrypt(user.password, process.env.ENCRYPTED_SECRET);

                if (loginPassDecrypted.toString(Crypto.enc.Utf8) == userPassDecrypted.toString(Crypto.enc.Utf8)){
                    response = new Response(user.toJSON(), false, null, 200);
                }
                else{
                    response = new Response(null, true, "Invalid email or password", 404);
                }
            }
            else{
                response = new Response(null, true, "Invalid email or password", 404);
            }
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response = new Response(null, true, error, 500);
        });

        return response;
    }

    static async findByEmail(email){
        let value = await User.findOne({where:{email: email}});
        if(value){
            return value;
        }
        else{
            return null;
        }
    }

    static async findById(id){
        var response;
        await User.findByPk(id)
        .then( (user) => {
            if (user != null){
                response = new Response(user.toJSON(), false, null, 200);
            }
            else{
                response = new Response(null, true, "User not found", 404);
            }
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response = new Response(null, true, error, 500);
        });
        return response;
    }
}

module.exports = UserRepo;