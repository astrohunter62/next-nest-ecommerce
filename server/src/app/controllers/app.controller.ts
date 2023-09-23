import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "../services/app.service";
import { users } from "src/utils/data/users";

@Controller("")
export class AppController {
  constructor(private appService: AppService) {}
  @Get()
  async getHello() {
    return users[0].password;
  }
  @Post("upload")
  @UseInterceptors(FileInterceptor("image"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.appService.uploadImageToCloudinary(file);

    return response.url;
  }
}
