import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const schoolRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.school.findMany();
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
    }
  ),
  deleteSchool: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.school.delete({
        where: {
          id: input.id,
        },
      });
    }
  ),
});
