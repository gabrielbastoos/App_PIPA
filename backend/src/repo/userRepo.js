const User = require('../models/users');
const Response = require('../shared/response-model');

class UserRepo{

    static async create(Obj) {
        let response = new Response();
        let userWithSameEmail = this.findByEmail(Obj.email);
        if (userWithSameEmail != null){
            response.data = null;
            response.hasError = true;
            response.error = "User with the same email already exist in the database";
            response.status = 409;
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
        .then( (value) => {
            response.data = value.toJSON();
            response.hasError = false;
            response.error = null;
            response.status = 200;
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response.data = null;
            response.hasError = true;
            response.error = error;
            response.status = 500;
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

    static async findUser(Obj){
        let response = new Response();
        await User.findOne({where:{
            email: Obj.email,
            password: Obj.password
            }
        })
        .then( (value) => {
            if (value != null){
                response.data = value;
                response.hasError = false;
                response.error = null;
                response.status = 200;
            }
            else{
                response.data = "Invalid email or password";
                response.hasError = true;
                response.error = null; 
                response.status = 404;  
            }
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response.data = null;
            response.hasError = true;
            response.error = error;
            response.status = 500;
        });
        return response;
    }
}

module.exports = UserRepo;