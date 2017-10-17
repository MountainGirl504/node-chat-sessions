module.exports = function (req, res, next){
    if (!req.session.user) {            //if no user exist
        req.session.user = {message : []}; //then create an empty object
    } 
}