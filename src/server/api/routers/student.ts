import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
  createStudent: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        schoolId: z.string(),
        yearOfGraduation: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.student.create({
        data: {
          userId: input.userId,
          schoolId: input.schoolId,
          yearOfGraduation: input.yearOfGraduation,
        },
      });
    }),
});
