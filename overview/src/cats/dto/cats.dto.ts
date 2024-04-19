import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
// export type CreateCatDto = z.infer<typeof createCatSchema>;

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }

export class UpdateCatDto {
  name: string;
  age: number;
  breed: string;
}
