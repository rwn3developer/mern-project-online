const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
    try{
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password,saltRounds);
        return hashPassword
    }catch(err){
        console.log(err);
    }
}
module.exports.comparePassword = async(password,hashPassword) => {
    return bcrypt.compare(password,hashPassword);
}