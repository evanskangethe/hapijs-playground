const Blog = require('./blog.controller')

module.exports = function(server){
    server.route({
        method: 'POST',
        path: '/api/blogs',
        handler: Blog.create
    });
    
    server.route({
        method: 'GET',
        path: '/api/blogs',
        handler: Blog.find
    })
    
    server.route({
        method: 'GET',
        path: '/api/blog/{id}',
        handler: Blog.findOne
    })
    
    server.route({
        method: 'PUT',
        path: '/api/blog/{id}',
        handler: Blog.update
    })
    
    server.route({
        method: 'DELETE',
        path:'/api/blog/{id}',
        handler: Blog.delete
    })
}
