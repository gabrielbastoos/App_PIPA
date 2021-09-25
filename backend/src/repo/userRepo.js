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
}

module.exports = UserRepo;