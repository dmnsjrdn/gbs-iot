import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getConfigurations({ filter, sortBy, page }) {
  let query = supabase
    .from("app_configuration")
    .select(
      "id, email_recipients, sms_recipients, enable_email_notif, modified_at",
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
    throw new Error("Configurations could not be loaded");
  }

  return { data, count };
}

export async function getConfiguration(id) {
  const { data, error } = await supabase
    .from("app_configuration")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Configurations not found");
  }

  return data;
}

export async function updateConfiguration(obj, id) {
  const { data, error } = await supabase
    .from("app_configuration")
    .update({...obj, modified_at: new Date()})
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Configurations could not be updated");
  }
  return data;
}
