import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogDto } from "src/blog/dto/blog.dto";
import { Blog, BlogDocument } from "./blog.schema";

@Injectable()
export class BlogService {
  blogs: BlogDto[];
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}
  async getAllBlogs() {
    return this.blogModel.find({});
  }

  async create(dto: BlogDto) {
    return this.blogModel.create(dto);
  }

  async getById(id: string) {
    return this.blogModel.findById(id);
  }

  async update(id: string, dto: BlogDto) {
    return this.blogModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.blogModel.findByIdAndDelete(id);
  }
}
