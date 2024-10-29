export const TYPES = {
  // Server
  Server: Symbol.for('Server'),
  Express: Symbol.for('Express'),

  // Models
  UserModel: Symbol.for('UserModel'),
  ChatModel: Symbol.for('ChatModel'),
  TalkModel: Symbol.for('TalkModel'),
  AttendeeModel: Symbol.for('AttendeeModel'),
  ChatMemberModel: Symbol.for('ChatMemberModel'),
  ConferenceModel: Symbol.for('ConferenceModel'),
  ChatHistoryModel: Symbol.for('ChatHistoryModel'),

  // Respositories
  UserRepository: Symbol.for('UserRepository'),
  ChatRepository: Symbol.for('ChatRepository'),
  TalkRepository: Symbol.for('TalkRepository'),
  AttendeeRepository: Symbol.for('AttendeeRepository'),
  ChatMemberRepository: Symbol.for('ChatMemberRepository'),
  ConferenceRepository: Symbol.for('ConferenceRepository'),
  ChatHistoryRepository: Symbol.for('ChatHistoryRepository'),

  // Services
  ChatService: Symbol.for('ChatService'),
  AuthService: Symbol.for('AuthService'),
  UserService: Symbol.for('UserService'),
  RedisService: Symbol.for('RedisService'),
  SocketService: Symbol.for('SocketService'),
  ConferenceService: Symbol.for('ConferenceService'),

  // Controllers
  AuthController: Symbol.for('AuthController'),
  UserController: Symbol.for('UserController'),
  ConferenceController: Symbol.for('ConferenceController'),

  // Middleware
  AuthHandler: Symbol.for('AuthHandler'),
  SessionHandler: Symbol.for('SessionHandler'),
  RateLimitHandler: Symbol.for('RateLimitHandler'),
};
