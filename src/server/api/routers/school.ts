import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const schoolRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.school.findMany({
      include: {
        Student: true,
        Teacher: true,
      },
    });
  }),
  createSchool: protectedProcedure
    .input(z.object({ name: z.string(), location: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.school.create({
        data: {
          name: input.name,
          location: input.location,
        },
      });
    }),
  deleteSchool: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.school.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
