'use strict'

const mutations = {
    createUser: (root, { input }) => {
        input.id = 1
        return input
    }
}

module.exports = {
    ...mutations
}