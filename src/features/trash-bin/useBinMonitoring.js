import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import { getBinMonitoring } from "../../services/apiBinLogs";

export function useBinMonitoring() {
  const { isLoading, data: initialData } = useQuery({
    queryKey: ["get_latest_bin_logs"],
    queryFn: getBinMonitoring,
  });

  const [binData, setBinData] = useState([]);

  useEffect(() => {
    if (initialData) {
      setBinData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:bin_log")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bin_log",
        },
        async (payload) => {
          const newBin = payload.new.bin;
          const newValue = payload.new.value;

          // Replace the existing bin with the new value
          setBinData((current) => {
            const updated = current.filter((d) => d.bin !== newBin);
            return [{ bin: newBin, value: newValue }, ...updated];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { isLoading, data: binData };
}
