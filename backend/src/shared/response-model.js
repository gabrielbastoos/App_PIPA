module.exports = class ResponseModel {
    constructor(data, hasError, error, status){
        this.data = data;
        this.hasError = hasError;
        this.error = error;
        this.status = status;
    };
}