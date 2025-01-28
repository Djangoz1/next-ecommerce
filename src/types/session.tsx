import { pool } from "@/utils/db";

type RefreshSessionResult = ReturnType<typeof pool.auth.refreshSession>;
export type SessionType = Awaited<RefreshSessionResult>["data"];
