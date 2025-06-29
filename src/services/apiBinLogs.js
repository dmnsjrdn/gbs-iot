import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getBinLogs({ sortBy, page, date }) {
  let query = supabase
    .from("bin_log")
    .select(
      "id, value, created_at, bin(bin)",
      { count: "exact" }
    );

  if (date)
    query = query.gte("created_at", date);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "des",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bin Log could not be loaded");
  }

  return { data, count };
}

export async function getBinLogsTop() {
  let query = supabase
    .from("bin_log")
    .select(
      "id, value, created_at, bin(bin)",
      { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(5);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bin Log could not be loaded");
  }

  return { data, count };
}

export async function getBinMonitoring() {
  const { data, error } = await supabase
    .rpc("get_latest_bin_logs")
    .select("log_id, bin_id, bin, value");

  if (error) {
    console.error(error);
    throw new Error("Bin Log could not be loaded");
  }

  return data;
}

export async function getBinLog(id) {
  const { data, error } = await supabase
    .from("bin_log")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Bin Log not found");
  }

  return data;
}

export async function getBinLogsAfterDate(date) {
  const { data, error } = await supabase
    .from("bin_log")
    .select("created_at, value")
    .gte("created_at", date);

  if (error) {
    console.error(error);
    throw new Error("Bin Log could not get loaded");
  }

  return data;
}

export async function getBinIdAfterDate(date) {
  const { data, error } = await supabase
    .from("bin_log")
    .select("*")
    .gte("created_at", date);

  if (error) {
    console.error(error);
    throw new Error("Bin Log could not get loaded");
  }

  return data;
}