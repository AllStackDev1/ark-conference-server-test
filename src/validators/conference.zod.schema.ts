import z from 'zod';

export const CreateConferenceSchema = z.object({
  image: z.string(),
  theme: z.string(),
  datetime: z.date(),
  location: z.string(),
});

export type CreateConferenceSchema = z.infer<typeof CreateConferenceSchema>;

export const UpdateConferenceSchema = z.object({
  theme: z.string().optional(),
  image: z.string().optional(),
  datetime: z.date().optional(),
  location: z.string().optional(),
});

export type UpdateConferenceSchema = z.infer<typeof UpdateConferenceSchema>;

export const CreateTalkSchema = z.object({
  topic: z.string(),
  datetime: z.string().datetime().pipe(z.coerce.date()),
  location: z.string(),
});

export type CreateTalkSchema = z.infer<typeof CreateTalkSchema>;

export const UpdateTalkSchema = z.object({
  topic: z.string().optional(),
  datetime: z.date().optional(),
  location: z.string().optional(),
});

export type UpdateTalkSchema = z.infer<typeof UpdateTalkSchema>;

export const CreateAttendeeSchema = z.object({
  userId: z.string(),
});

export type CreateAttendeeSchema = z.infer<typeof CreateAttendeeSchema>;

export const UpdateAttendeeSchema = z.object({
  talkId: z.string().optional(),
  userId: z.string().optional(),
});

export type UpdateAttendeeSchema = z.infer<typeof UpdateAttendeeSchema>;
