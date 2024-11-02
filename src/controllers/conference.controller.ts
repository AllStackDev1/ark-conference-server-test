import { BAD_REQUEST, CREATED, NO_CONTENT, OK } from 'http-status';
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { ConferenceService } from 'services';
import { Route, AuthGuard, Validator, Controller } from 'decorators';
import {
  ParamsWithId,
  CreateTalkSchema,
  CreateConferenceSchema,
  CreateAttendeeSchema,
  UpdateAttendeeSchema,
} from 'validators';
import { AppError } from 'utils';

@Controller('/conferences')
@injectable()
export class ConferenceController {
  constructor(
    @inject(TYPES.ConferenceService)
    private service: ConferenceService,
  ) {}

  // route to create a conference
  @Route('post')
  @AuthGuard()
  @Validator({ body: CreateConferenceSchema })
  async create(req: Request<[], [], CreateConferenceSchema>, res: Response) {
    return res.status(CREATED).json({
      user: await this.service.create(req.body),
      message: 'Conference created successfully',
    });
  }

  // route to get all conferences
  @Route('get')
  @AuthGuard()
  async getAll(req: Request, res: Response) {
    return res.status(OK).json(await this.service.getAllConferences());
  }

  // route to get a conference by it ID
  @Route('get', '/:id')
  @AuthGuard()
  @Validator({ params: ParamsWithId })
  async getById(req: Request<ParamsWithId>, res: Response) {
    return res
      .status(OK)
      .json({ data: await this.service.getConferenceById(req.params.id) });
  }

  // route to add a talk to a conference
  @Route('post', '/:id/talk')
  @AuthGuard()
  @Validator({ params: ParamsWithId, body: CreateTalkSchema })
  async addTalk(
    req: Request<ParamsWithId, [], CreateTalkSchema>,
    res: Response,
  ) {
    return res.status(OK).json({
      data: await this.service.addTalkToConference(req.params.id, req.body),
      message: 'Talk successfully added to conference',
    });
  }

  // route to remove a talk from a conference
  @Route('delete', '/talks/:id')
  @AuthGuard()
  @Validator({ params: ParamsWithId })
  async removeTalk(req: Request<ParamsWithId>, res: Response) {
    await this.service.removeTalk(req.params.id);
    return res
      .status(OK)
      .json({ message: 'Talk successfully removed from conference' });
  }

  // route to register/add an attendee for/to a conference
  @Route('post', '/:id/attendee/register')
  @AuthGuard()
  @Validator({ params: ParamsWithId, body: CreateAttendeeSchema })
  async addAttendee(
    req: Request<ParamsWithId, [], CreateAttendeeSchema>,
    res: Response,
  ) {
    return res.status(OK).json({
      data: await this.service.addAttendeeToConference(req.params.id, req.body),
      message: 'Conference registration successfully',
    });
  }

  // route to add an attendee to a talk in a conference
  @Route('post', '/attendee/:id/talk/register')
  @AuthGuard()
  @Validator({ params: ParamsWithId, body: UpdateAttendeeSchema })
  async addTalkToAttendee(
    req: Request<ParamsWithId, [], UpdateAttendeeSchema>,
    res: Response,
  ) {
    //TODO: check if talk is in same conference as attendee
    const { talkId } = req.body;
    if (!talkId) throw new AppError('Talk ID is required', BAD_REQUEST);
    return res.status(OK).json({
      data: await this.service.addTalkToAttendee(req.params.id, talkId),
      message: 'Welcome, please be of good behaviour and respect the rules.',
    });
  }

  @Route('delete', '/:id')
  @AuthGuard()
  @Validator({ params: ParamsWithId })
  async delete(req: Request<ParamsWithId, [], []>, res: Response) {
    await this.service.delete(req.params.id);
    return res.status(NO_CONTENT).json({
      message: 'Conference deleted succesfully.',
    });
  }
}
