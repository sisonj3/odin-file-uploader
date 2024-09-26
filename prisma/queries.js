const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get specific user based on username
async function getUser(name) {
    const user = await prisma.users.findUnique({
        where: { username: name }
    });

    if (user) {
        return user;
    }
    
}

// Get specific user based on id
async function getUserById(id) {
    const user = await prisma.users.findFirst({
        where: { id: id }
    });

    if (user) {
        return user;
    }
}

// Add user
async function addUser(user, pass) {
    await prisma.users.create({
        data: {
            username: user,
            password: pass
        }
    });
}

module.exports = {
    getUser,
    getUserById,
    addUser
}
