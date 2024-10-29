import { CREATED } from 'http-status';
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { ChatService } from 'services';
import { CreateChatSchema } from 'validators';
import { Route, AuthGuard, Validator, Controller } from 'decorators';

@Controller('/chats')
@injectable()
export class ChatController {
  constructor(
    @inject(TYPES.ChatService)
    private service: ChatService,
  ) {}

  // route to spin up a chat room
  @Route('post')
  @AuthGuard()
  @Validator({ body: CreateChatSchema })
  async create(req: Request<[], [], CreateChatSchema>, res: Response) {
    return res.status(CREATED).json(await this.service.create(req.body));
  }
}
