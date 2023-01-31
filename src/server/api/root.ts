import { createTRPCRouter } from "./trpc";
import { schoolRouter } from "./routers/school";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  school: schoolRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
