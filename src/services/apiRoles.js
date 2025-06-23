import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getRoles({ filter, sortBy, page }) {
  let query = supabase
    .from("role")
    .select(
      "id, name, sort, created_at",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Roles could not be loaded");
  }

  return { data, count };
}