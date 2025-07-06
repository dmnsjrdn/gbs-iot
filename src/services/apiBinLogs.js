import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export async function downloadBinLogsAsPDF(binLogs) {
  if (!binLogs || binLogs.length === 0) {
    console.warn("No bin logs provided.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Bin Logs Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["ID", "Bin", "Value", "Timestamp"]],
    body: binLogs.map((row) => [
      row.id,
      row.bin?.bin ?? row.bin ?? "N/A", // fallback for nested bin or plain
      row.value + "%",
      new Date(row.created_at).toLocaleString(),
    ]),
    styles: { fontSize: 10 },
  });

  doc.save(`bin_logs_${new Date().toISOString()}.pdf`);
}

export async function getBinLogs({ sortBy, page }) {
  let query = supabase
    .from("bin_log")
    .select("bin, value, created_at, bin(bin)", { count: "exact" });

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
    throw new Error("Bin Log could not be loaded");
  }

  return { data, count };
}

export async function getBinLogsTop() {
  let query = supabase
    .from("bin_log")
    .select(
      "bin, value, created_at, bin(bin)")
    .order("created_at", { ascending: false })
    .range(0, 4);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bin Log could not be loaded");
  }

  return { data };
}

export async function getBinMonitoring() {
  const { data, error } = await supabase
    .rpc("get_latest_bin_logs")
    .select("log_id, bin, value");

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
    .select("created_at, value, bin(bin)")
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