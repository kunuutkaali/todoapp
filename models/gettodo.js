module.exports = {
    getTodo: async function () {
        const todo = await todos.find();
        return todo;
    }
}