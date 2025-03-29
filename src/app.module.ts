import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlogModule } from "./blog/blog.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://akbarov099:umar0912@cluster0.pjpalps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// akbarov099
// umar0912
// mongodb+srv://akbarov099:<db_password>@cluster0.pjpalps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
