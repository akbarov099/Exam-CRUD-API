import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { BlogDto } from "src/blog/dto/blog.dto";
import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(200)
  @Get()
  async getAll() {
    return this.blogService.getAllBlogs();
  }

  @HttpCode(201)
  @Post("create")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    })
  )
  @UsePipes(ValidationPipe)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: BlogDto
  ) {
    const imagePath = file ? `/uploads/${file.filename}` : undefined;
    return this.blogService.create({ ...dto, image: imagePath });
  }

  @HttpCode(200)
  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.blogService.getById(id);
  }

  @HttpCode(200)
  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: BlogDto) {
    return this.blogService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.blogService.delete(id);
  }
}
