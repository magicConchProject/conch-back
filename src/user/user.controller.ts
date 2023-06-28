import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { Response, Request } from 'express';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getCurrentUser(@Req() req: Request) {
    //토큰이 없으면
    if (!req?.cookies?.token) {
      return new HttpException('no token', 403);
    }
    return this.userService.verifyToken(req?.cookies?.token);
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/signin')
  async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.jwtLogin(signinUserDto);

    const threeDays = 3 * 24 * 60 * 60 * 1000;
    res.cookie('token', token.token, {
      httpOnly: true,
      maxAge: threeDays,
    });
    return { message: '로그인 성공' };
  }

  @Get('/signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    return { message: '로그아웃' };
  }

  @UseGuards(JwtGuard)
  @Get('/userinfo')
  async findUserInfo(@Req() req: Request) {
    return this.userService.findUserInfo(req['user']['id']);
  }
  @UseGuards(JwtGuard)
  @Patch('/editUserName')
  async editUserName(@Req() req: Request, @Body('name') name: string) {
    return this.userService.editUserName(req['user']['id'], name);
  }
  @UseGuards(JwtGuard)
  @Patch('/editPassword')
  async editPassword(@Req() req: Request, @Body('password') password: string) {
    return this.userService.editUserPassword(req['user']['id'], password);
  }
}
