const User = require('../models/users');
const Response = require('../shared/response-model');

class UserRepo{

    static async create(Obj) {
        let response = new Response();
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
        .then( (value) => {
            response.data = value.toJSON();
            response.hasError = false;
            response.error = null;
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response.data = null;
            response.hasError = true;
            response.error = error;
        });
        return response;
    }

    static async findUser(Obj){
        let response = new Response();
        await User.findOne({where:{
            email: Obj.email,
            password: Obj.password
            }
        })
        .then( (value) => {
            if (value != null){
                response.data = 200;
                response.hasError = false;
                response.error = null;
            }
            else{
                response.data = 404;
                response.hasError = true;
                response.error = null;    
            }
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response.data = 500;
            response.hasError = true;
            response.error = error;
        });
        return response;
    }
}

module.exports = UserRepo;