import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req, UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import UsersService from '../service/user.service';
import { JoiValidate } from '../../utils';
import { FileInterceptor } from '@nestjs/platform-express';
import AuthGuard from '../guard/auth.guard';


@Controller('')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(AuthGuard)
  @Get('user/loggedin')
  async getLoggedInUser(@Req() req) {
    return {
      ...req.user,
      token: req.token,
    }
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async get(@Query() query, @Req() req) {
    return this.usersService.get(query.page, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('users')
  async add(@Body() body, @Req() req) {
    const { photo, email, password } = body;
    return this.usersService.add({ photo, email, password }, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete('users/:id')
  async delete(@Param("id") id: string, @Req() req) {
    console.log(id,'******************');
    return this.usersService.delete(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Put('users/:id')
  async update(@Param("id") id: string, @Body() body, @Req() req) {
    const { photo, email, password } = body;
    return this.usersService.update(id,{ photo, email, password }, req.user);
  }
}