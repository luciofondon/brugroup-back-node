'use strict'
const UserService = require('brugroup-client-rest').UserService

const service = new UserService(process.env.endpoint)

const mutations = {
  createUser: async (root, args) => {
    const newUser = {}
    newUser.fullName = args.input.fullName
    newUser.username = args.input.username
    newUser.password = args.input.password
    try {
      return await service.addUser(newUser)
    } catch (e) {
      throw new Error(e)
    }
  },
  updateUser: async (root, args) => {
    const updateUser = {}
    updateUser.fullName = args.input.fullName
    updateUser.username = args.input.username
    updateUser.password = args.input.password
    try {
      return await service.updateUser(args.id, updateUser)
    } catch (e) {
      throw new Error(e)
    }
  },
  deleteUser: async (root, args) => {
    try {
      const user = await service.getUser(args.id)
      await service.removeUser(args.id)
      return user
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = {
  ...mutations
}
