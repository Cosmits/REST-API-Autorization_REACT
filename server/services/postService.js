import Post from "../models/postModel.js";
import FileService from "./fileService.js";

class PostService {
    async create(post, picture) {
        const fileName = await FileService.saveFile(picture);
        const createdPost = await Post.create({...post, picture: fileName});
        return createdPost;
    }

    async getAllPosts() {
        const posts = await Post.find();
        return posts;
    }

    async getOnePost(id) {
        if (!id) {
            throw new Error(" ID not find ");
        }
        const post = await Post.findById(id);
        return post;
    }

    async updatePost(post) {
        if (!post._id) {
            throw new Error(" ID not find ");
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
            new: true,
        });
        return updatedPost;
    }

    async deletePost(id) {
        if (!id) {
            throw new Error(" ID not find ");
        }
        const post = await Post.findByIdAndDelete(id);
        return post;
    }
}

export default new PostService();
