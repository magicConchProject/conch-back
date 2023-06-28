import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/addComment')
  create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto, req['user'] as User);
  }

  @Get('/my')
  findMyAll(@Req() req: Request) {
    return this.commentService.findMyAll(req['user']['id']);
  }

  @Get(':post_id')
  findAll(@Param('post_id') post_id: number, @Req() req: Request) {
    return this.commentService.findAll(post_id, req['user']['id']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('comment') comment: string) {
    return this.commentService.update(+id, comment);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
