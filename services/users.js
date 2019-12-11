const MongoLib = require('../lib/mongo')

class UsersService {
    constructor(){
        this.collection = 'users'
        this.mongoDB = new MongoLib()
    }

    async getUsers({tags}) {
        const query = tags && {tags: {$in: tags}}
        const users = await this.mongoDB.getAll(this.collection, query)
        console.log('Sending users list...');
        
        return users || []
    }

    async getUser(userId) {
        const user = await this.mongoDB.get(this.collection, userId)
        console.log(`Sending ${userId} data...`);
        return user || {}
    }

    async getUserBy(data) {
        const user = await this.mongoDB.getBy(this.collection, data)
        console.log(`Returning data...`);
        return user || {}
    }
    
    async createUser({ user }) {
        const createUserId = this.mongoDB.create(this.collection, user)
        console.log(`${user.username} created.`);
        return createUserId
    }
    
    async updateUser(userId, user) {
        const updateUserId = this.mongoDB.update(this.collection, userId, user)
        console.log(`${userId} updated.`);
        return updateUserId
    }
    
    async deleteUser({username}) {
        const deletedUserId = this.mongoDB.delete(this.collection, username)
        console.log(`${username} deleted.`);
        return deletedUserId
    }   
    
}

module.exports = UsersService