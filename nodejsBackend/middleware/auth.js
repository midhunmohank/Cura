const crypto = require('crypto')
const algorithm = 'aes-256-ecb'
const secret = process.env.JWT_SECRET
const model = require('../../nodejsBackend/models/user_credentials.model')
var bcrypt = require('bcryptjs');

module.exports = {

    async checkPassword(password, user) {
      return new Promise((resolve, reject) => {
  
          if(bcrypt.compareSync(password, user.password)){ //if matched successfully
  
              resolve(true)
          }else{
              resolve(false)
          }
  
      })
    },


    async checkStatus(user) {

        return new Promise((resolve, reject) => {

            if(user.status == 'active'){  //if matched successfully

                resolve(true)
            }else{
              console.log("Error")
                resolve(false)
            }
        })
      },
}