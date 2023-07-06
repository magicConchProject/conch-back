import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt/jwt.guard';
import { Response } from 'express';
import { Stream } from 'stream';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, { cors: { origin: '*' } })
@Controller()
export class AppController implements OnGatewayInit {
  constructor(private readonly appService: AppService) {}

  afterInit() {
    console.log('WebSocket server initialized');
  }

  @Get()
  async getBard(): Promise<object> {
    return this.appService.getBard();
  }

  @Post()
  async postBard(@Body('ask') ask: string): Promise<object> {
    return this.appService.postBard(ask);
  }

  @WebSocketServer()
  server: Server;

  // gptChat WebSocket 핸들러
  // @UseGuards(JwtGuard)
  @SubscribeMessage('gptChat')
  async handleGptChat(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const {
      model,
      messages,
      concept,
      temperature,
      topP,
      maximumLength,
      frequencyPenalty,
      presencePenalty,
    } = data;
    try {
      const completion: any = await this.appService.postChatGPT(
        model,
        messages,
        concept,
        temperature,
        topP,
        maximumLength,
        frequencyPenalty,
        presencePenalty,
      );

      completion.data.on('data', (response) => {
        const lines = response
          .toString()
          .split('\n')
          .filter((line) => line.trim() !== '');

        for (const line of lines) {
          const message = line.replace(/^data: /, '');

          if (message === '[DONE]') {
            client.emit('gptResponse', '[DONE]'); // 클라이언트에 '[DONE]' 이벤트 전송
            return;
          }

          try {
            const parsed = JSON.parse(message);

            if (
              parsed.choices[0].delta.content != '' &&
              parsed.choices[0].delta.content != undefined
            ) {
              // console.log('와라!!!!' + parsed.choices[0].delta.content);
              client.emit('gptResponse', parsed.choices[0].delta.content); // 클라이언트에 gptResponse 이벤트와 데이터 전송
            }
          } catch (error) {
            console.error('으아아아아아' + error);
            client.emit('gptResponse', 'error');
          }
        }
      });
    } catch (err) {
      client.emit('gptResponse', 'error');
    }
  }

  @UseGuards(JwtGuard)
  @Post('/createGptImage')
  async createGptImage(
    @Body('n') n: number,
    @Body('prompt') prompt: string,
    @Body('size') size: string,
  ) {
    return this.appService.creatImageGPT(prompt, n, size);
  }
}
