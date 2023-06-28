import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/addPost')
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto, req['user'] as User);
  }
  @Get('/my/:group_id')
  findMyAll(@Req() req: Request, @Param('group_id') group_id: number) {
    return this.postService.findMyAll(req['user']['id'], group_id);
  }

  @Get(':group_id')
  findAll(
    @Param('group_id') group_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('order') order: string,
    @Query('searchOption') searchOption: string,
    @Query('search') search: string,
    @Query('tag') tag_id: number | number,
    @Req() req: Request,
  ) {
    return this.postService.findAll(
      group_id,
      page,
      limit,
      order,
      searchOption,
      search,
      req['user']['id'],
      tag_id,
    );
  }

  @Get('/postDetail/:post_id')
  findPost(@Param('post_id') post_id: number, @Req() req: Request) {
    return this.postService.findOne(post_id, req['user']['id']);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('contents') contents: string,
    @Body('tag_id') tag_id: number | null,
  ) {
    return this.postService.update(+id, title, contents, tag_id);
  }

  @Patch('/plusView/:id')
  plusView(@Param('id') id: string) {
    return this.postService.plusView(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
