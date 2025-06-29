import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { BarChart, Bar, Legend } from "recharts";

const StyledBinChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  border: 1px solid #e5e7eb;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function BinChart({ bin_log, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const groupedData = {};

  bin_log.forEach((entry) => {
    const dateKey = format(new Date(entry.created_at), "yyyy-MM-dd");
    const binName = entry.bin?.bin;

    if (entry.value >= 80 && binName) {
      if (!groupedData[dateKey]) groupedData[dateKey] = {};
      if (!groupedData[dateKey][binName]) groupedData[dateKey][binName] = 0;

      groupedData[dateKey][binName]++;
    }
  });

  const chartData = Object.entries(groupedData).map(([date, bins]) => ({
    date: format(new Date(date), "MMM dd"),
    ...bins,
  }));

  const allBinNames = new Set();
  chartData.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "date") allBinNames.add(key);
    });
  });

  const colors = isDarkMode
    ? {
      aboveEighty: { stroke: "#4f46e5", fill: "#4f46e5" },
      belowEighty: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      aboveEighty: { stroke: "#4f46e5", fill: "#c7d2fe" },
      belowEighty: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  return (
    <StyledBinChart>
      <Heading as="h2">
        Bin Logs from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="date" tick={{ fill: colors.text }} />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            tickFormatter={(value) => Math.round(value)}
            allowDecimals={false}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend />
          {[...allBinNames].map((binName, index) => (
            <Bar
              key={binName}
              dataKey={binName}
              fill={`hsl(${(index * 60) % 360}, 70%, 60%)`}
              name={binName}
              stroke="#333"
              strokeWidth={1}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </StyledBinChart>
  );
}

export default BinChart;
