import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getBins({ sortBy, page }) {
  let query = supabase
    .from("bin")
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
    throw new Error("Bin could not be loaded");
  }

  return { data, count };
}

export async function getBinById(id) {
  const { data, error } = await supabase
    .from("bin")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Bin not found");
  }

  return data;
}

export async function createEditBin(newBin, id) {
  let query = supabase.from("bin");

  if (!id) query = query.insert([{ ...newBin }]);

  if (id) query = query.update({ ...newBin }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Bin could not be created");
  }

  return data;
}


export async function deleteBin(id) {
  const { data, error } = await supabase.from("bin").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Bin could not be deleted");
  }

  return data;
}