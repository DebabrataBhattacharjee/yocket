const bcrypt = require('bcrypt');
const hashPassword = async (plainTextPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
}

const compareHashPassword = async (Password, hashedPassword) => {
    const isValid = await bcrypt.compare(Password, hashedPassword);
    return isValid;
}

module.exports = {
    hashPassword,
    compareHashPassword
};
