const Bcrypt = require('bcrypt');

class secureService 
{
    encryptPass(password) 
    {
        return Bcrypt.hashSync(password, 10);
    }

}

module.exports = secureService;
