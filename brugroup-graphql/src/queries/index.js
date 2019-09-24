'use strict'
const UserService = require('brugroup-client-rest').UserService

const service = new UserService(process.env.endpoint)

const queries = {
  getUser: async (root, args) => {
    try {
      return await service.getUser(args.id)
    } catch (e) {
      throw new Error(e)
    }
  },
  getUsers: async () => {
    try {
      return await service.getUsers()
    } catch (e) {
      throw new Error(e)
    }
  }

}

module.exports = {
  ...queries
}
