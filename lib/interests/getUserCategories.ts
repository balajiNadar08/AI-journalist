import { supabaseServer } from "../supabase-server";

export async function getUserCategories(userId: string) {
  const { data: interests, error } = await supabaseServer
    .from("user_interests")
    .select("category_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  if (!interests?.length) return [];

  const categoryIds = interests.map((i) => i.category_id);

  const { data: categories, error: categoryError } = await supabaseServer
    .from("categories")
    .select("id,name")
    .in("id", categoryIds);

  if (categoryError) throw new Error(categoryError.message);

  return categories?.map((c) => c.name) || [];
}