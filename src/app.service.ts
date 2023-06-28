import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from 'openai';

async function getBard(): Promise<any> {
  const { BardAPI } = await import('bardapi');

  return new BardAPI({
    sessionId: process.env.BARD_SESSION_ID,
  });
}

@Injectable()
export class AppService {
  bard: any;
  openai: OpenAIApi;
  constructor() {
    getBard().then((res) => {
      this.bard = res;
    });

    const configuration = new Configuration({
      organization: 'org-N63hDcBdQzEP2Xq5c5ldXwYX',
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(configuration);
  }
  async getBard(): Promise<object> {
    return await this.bard.ask({ message: '안녕' });
  }
  async postBard(ask: string): Promise<object> {
    return await this.bard.ask({ message: ask });
  }

  //[{role: "user", content: "Hello world"}, {role: "user", content: "Hello world"}]
  //"gpt-3.5-turbo"
  async postChatGPT(model: string, messages: any, concept: string) {
    const myConcept = {
      role: 'system',
      content: concept,
    };

    await messages.unshift(myConcept);

    try {
      return this.openai.createChatCompletion(
        {
          model,
          messages,
          stream: true,
        },
        { responseType: 'stream' },
      );

      // return chatCompletion.data.choices[0].message;
    } catch (err) {
      console.error(err);
      throw new HttpException({ status: 500, error: 'gpt 오류' }, 500);
    }
  }

  //이미지 생성
  async creatImageGPT(prompt: string, n: number, size: string) {
    try {
      const chatCompletion = await this.openai.createImage({
        prompt,
        n: Number(n),
        size: size as CreateImageRequestSizeEnum,
      });
      return { data: chatCompletion.data.data };
    } catch (err) {
      console.log('Error: ' + err);
      throw new UnauthorizedException('gpt 오류');
    }
  }
}
