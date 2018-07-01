const Bcrypt = require('bcrypt');

class secureService 
{
    encryptPass(password) 
    {
        return Bcrypt.hashSync(password, 10);
    }

    comparePass(password, hash) {
        return Bcrypt.compareSync(password, hash);
    }

}

module.exports = secureService;
