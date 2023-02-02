import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  findUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        include: {
          School: true,
          Student: true,
          Teacher: true,
        },
      });
    }),
  listUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        School: true,
        Student: true,
        Teacher: true,
      },
    });
  }),
  mapSchool: protectedProcedure
    .input(z.object({ userId: z.string(), schoolId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          schoolId: input.schoolId,
        },
      });
    }),
  removeSchool: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          schoolId: null,
        },
      });
    }),
});
