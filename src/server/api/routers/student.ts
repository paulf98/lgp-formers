import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
  createStudent: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        schoolId: z.string(),
        startedInYear: z.number(),
        leftInYear: z.number(),
        graduated: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.student.create({
        data: {
          userId: input.userId,
          schoolId: input.schoolId,
          startedInYear: input.startedInYear,
          leftInYear: input.leftInYear,
          graduated: input.graduated,
        },
      });
    }),
});
