const Blog = require('./blog.model')

module.exports = {
    
    create: function (request,h) {
         if (!request.payload.title || !request.payload.body || !request.payload.author ) {
                return h.response({Error:'Insure the blog has a title,body and author name'}).code(400)
            }
            
            const blog = Blog.create({
                            title: request.payload.title,
                            body: request.payload.body,
                            author: request.payload.author
                         });
            
            if (!blog) {
                throw Boom.serverUnavailable('unavailable')
            }
            
            return blog;
    },
    
    find: function (request,h) {
        const blogs = Blog.find({})
            
            if(!blogs) {
                throw Boom.notFound('not found')
            }
            
            return blogs;
    },
    
    findOne: function (request,h) {
        if (!request.params.id) {
                return h.response('Please put the id').code(400)
            }
            const blog = Blog.findById(request.params.id)
            
            if(!blog) {
                throw Boom.notFound('not found')
            }
            
            return blog;
    },
    
    update: function (request,h) {
        if (!request.params.id) {
                return h.response('Please put the id').code(400)
            }
            
            let attributes = {}
            
            if (request.payload.title) {
                attributes.title = request.payload.title;
            }
            
            if(request.payload.author) {
                attributes.author = request.payload.author;
            }
            
            if (request.payload.body) {
                attributes.body = request.payload.body;
            }
            
            const blog = Blog.findByIdAndUpdate(request.params.id,attributes,{new:true})
            
            if (!blog) {
                throw Boom.notFound('not found')
            }
            
            return blog;
    },
    
    delete: function(request,h) {
         if (!request.params.id) {
                return h.response('please put id of record to delete').code(400)
            }
            
            const blog = Blog.findByIdAndRemove(request.params.id)
            
            if (!blog) {
                throw Boom.notFound('not found')
            }
            
            return blog;
    }
}
