module.exports = class ResponseModel {
    constructor(data, hasError, error){
        this.data = data;
        this.hasError = hasError;
        this.error = error;
    };
}