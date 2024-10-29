import z from 'zod';

export const CreateChatSchema = z.object({
  talkId: z.string(),
});

export type CreateChatSchema = z.infer<typeof CreateChatSchema>;

export const CreateChatHistorySchema = z.object({
  chatId: z.string(),
  message: z.string(),
  timestamp: z.date(),
  senderId: z.string(),
});

export type CreateChatHistorySchema = z.infer<typeof CreateChatHistorySchema>;
