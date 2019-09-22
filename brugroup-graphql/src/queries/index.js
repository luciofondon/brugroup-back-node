'use strict'
const clientRest = require('brugroup-client-rest');

let services, User

const queries = {
  getUser: async ({ root, args }) => {
    
    /*try {
      services = await db(config.db)
    } catch (e) {
      throw new Error(e)
    }
    Hotel = services.Hotel
    return await Hotel.findById(args.id)*/
    return await clientRest().UserService.getUsers();

  },
  getUsers: async () => {
    /*try {
      services = await db(config.db)
    } catch (e) {
      throw new Error(e)
    }
    Hotel = services.Hotel
    return await Hotel.findAll()*/
    const User =  clientRest().UserService
    return await new User().getUsers();
  }
  
}

module.exports = {
  ...queries
}