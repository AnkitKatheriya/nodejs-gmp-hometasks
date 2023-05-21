const HttpStatus = require('http-status-codes');

const repository = require('../repository/Users')
const schemas = require('../schemas/UserSchema')
const router = express.Router()

router.get('/users', async (req, res, next) => {
    try {
        const allUsers = await repository.getAllUsers();
        res.status(HttpStatus.OK).send({ data: allUsers })
    } catch(error) {
        next(error);
    }
})

router.get('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await repository.getUserById(id)
        if(!user){
            const error = new Error('User does not exists')
            return next(error)
        }
        res.status(HttpStatus.OK).send({ data: user })
    } catch(error) {
        next(error)
    }
})

router.post('/users', async (req, res, next) => {
    try {
        const { login, password, age, isDeleted } = req.body
        const result = await schemas.userSchema({ login, password, age, isDeleted })
        const newUser = await repository.createUser({
            login,
            password,
            age,
            isDeleted
        });
        res.status(HttpStatus.CREATED).send({data: newUser, message: 'User created successfully'});
    } catch(error) {
        next(error)
    }
})

router.put('/users/:id', (req, res, next) => {
    try {
        //need to complete logic
        const { id } = req.params
        const { login, password, age, isDeleted } = req.body
        const updatedUser = repository.updateUser(req)
        if(Object.keys(updatedUser).length < 1){
            const error = new Error('User not found')
            next(error)
        }
        res.status(HttpStatus.OK).send({ data: updatedUser, message: 'User updated successfully'})
    } catch(error) {
        next(error)
    } 
})

router.delete('/users/:id', (req, res, next) => {
    try {
        const { id } = req.params
        const deletedUser = repository.deleteUserById(id)
        if(Object.keys(deletedUser).length < 1){
            const error = new Error('User not found')
            next(error)
        }
        res.status(HttpStatus.OK).send({ message: 'User deleted successfully'})
    } catch(error) {
        next(error)
    }
})

router.get('/users/auto-suggest', (req, res, next) => {
    try {
        const { loginSubstring, limit } = req.query
        const autoSuggestedUsers = repository.getAutoSuggestUsers(loginSubstring, limit)
        res.status(HttpStatus.OK).send({ data: autoSuggestedUsers })
    } catch(error) {
        next(error)
    }
})

module.exports = {
    router
}