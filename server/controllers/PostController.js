import PostService from "../services/postService.js";

class PostController {
    async create(req, res) {
        try {
            // console.log(req.files)
            const post = await PostService.create(req.body, req.files.picture)
            res.status(200).json(post)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getAllPosts(req, res) {
        try {
            const post = await PostService.getAllPosts()
            res.status(200).json(post)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getOnePost(req, res) {
        try {
            const post = await PostService.getOnePost(req.params.id)
            res.status(200).json(post)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async updatePost(req, res) {
        try {
            const updatedPost = await PostService.updatePost(req.body)
            res.status(200).json(updatedPost)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    async deletePost(req, res) {
        try {
            const post = await PostService.deletePost(req.params.id)
            res.status(200).json(post)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}

export default new PostController()