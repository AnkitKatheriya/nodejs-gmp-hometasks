const allUsers = require('../data/Users')
const { randomUUID } = require('crypto')

const generateUserId = async () => {
    return randomUUID()
}

const findById = async (id) => {
    return allUsers.find((user) => user.id === id)
}

const getAllUsers = async () => {
    return allUsers
}

const getUserById = async (id) => {
    return allUsers.filter(user => user.id === id)
}

const createUser = async (newUser) => {
    const user = {
        id: await generateUserId(),
        ...newUser
    }
    allUsers.push(user)
    return user
}

const deleteUserById = async (id) => {
    const foundUser = await findById(id)
    if(foundUser){
        foundUser.isDeleted = true
        return Object.assign(foundUser, { isDeleted: true })
    }
    return {}
}

const updateUser = async (req) => {
    const foundUser = await findById(req.body.id)
    if(foundUser){
        return Object.assign(foundUser,req.body)
    }
    return {}
}

const getAutoSuggestUsers = (loginSubstring, limit) => {
    let requestedUsers = allUsers.filter(user => {
        return user.login.indexOf(loginSubstring) !== -1;
    })
    return requestedUsers.length <= limit ? requestedUsers: requestedUsers.slice(0,limit)
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUser,
    getAutoSuggestUsers
}