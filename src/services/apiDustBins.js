import supabase from "./supabase_trash_bin";
import { PAGE_SIZE } from "../utils/constants";

export async function getDustBins({ sortBy, page }) {
  let query = supabase
    .from("dust_bin")
    .select("*", { count: "exact" });

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
    throw new Error("Dust Bin could not be loaded");
  }

  return { data, count };
}

export async function getDubBinById(id) {
  const { data, error } = await supabase
    .from("dust_bin")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Dust Bin not found");
  }

  return data;
}