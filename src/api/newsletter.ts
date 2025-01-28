import { pool } from "@/utils/db";

export const createNewsletterQuery = async (email: string) => {
  try {
    const result = await pool
      .from("newsletter")
      .insert({ email })
      .select()
      .single();
    if (!result.data) {
      throw new Error("Something went wrong when creating newsletter");
    }
    return result.data as { id: number; email: string; created_at: string };
  } catch (error) {
    console.error("Error create newsletter query", error);
    throw error;
  }
};

export const getNewsletterQuery = async () => {
  const result = await pool.from("newsletter").select();
  return result.data as { id: number; email: string; created_at: string }[];
};

export const getNewsletterByEmailQuery = async (email: string) => {
  try {
    const result = await pool
      .from("newsletter")
      .select()
      .eq("email", email)
      .single();
    return result.data as { id: number; email: string; created_at: string };
  } catch (error) {
    throw error;
  }
};

export const deleteNewsletterQuery = async (id: number) => {
  const result = await pool
    .from("newsletter")
    .delete()
    .eq("id", id)
    .select()
    .single();

  console.log({ result });
  if (!result.data) {
    throw new Error("Something went wrong when deleting newsletter");
  }
  return result.data as { id: number; email: string; created_at: string };
};
