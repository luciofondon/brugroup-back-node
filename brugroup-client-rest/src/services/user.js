const BaseService = require('./base')
const config = require('../../config/config.json')

class UserService extends BaseService{
    constructor(endpoint){
      super(`${endpoint}${config.endpoint.user}`)
    }
  
    async getUsers() {
        let users = []
        try {
            users = await this.getData()
        } catch (error) {
            console.error(error);
        }
        return users;
    }
  
    async getUser(userId) {
      let user = {}
      try {
        user = await this.getData(userId)
      } catch (error) {
          console.error(error);
      }
      return user;
    }

    async addUser(user) {
      let userAux = {}
      try {
        userAux = await this.addData(user)
      } catch (error) {
          console.error(error);
      }
      return userAux;
    }
  
    async updateUser(userId, user) {
      let userAux = {}
      try {
        userAux = await this.updateData(userId, user)
      } catch (error) {
          console.error(error);
      }
      return userAux;
    }
  
    async removeUser(userId) {
      let user = {}
      try {
        user = await this.removeData(userId)
      } catch (error) {
          console.error(error);
      }
      return user;
    }
  }
  
  module.exports = UserService;
