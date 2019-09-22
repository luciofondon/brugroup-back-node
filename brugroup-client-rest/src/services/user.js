const BaseService = require('./base')

class UserService extends BaseService{
    constructor() {
      super("http://localhost:9090/api/users")
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
      let users = {}
      try {
            users = await this.getData(userId)
      } catch (error) {
          console.error(error);
      }
      return users;
    }
  
    async addUser(user) {
      let user = {}
      try {
        user = await this.addData(user)
      } catch (error) {
          console.error(error);
      }
      return user;
    }
  
    async updateUser(userId, user) {
      let user = {}
      try {
        user = await this.updateData(userId)
      } catch (error) {
          console.error(error);
      }
      return user;
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
