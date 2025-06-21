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

const StyledBinChart = styled(DashboardBox)`
  grid-column: 1 / -1;

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

  const data = allDates.map((date) => {
    let aboveEighty = 0;
    let belowEighty = 0;

    bin_log.forEach((entry) => {
      if (isSameDay(date, new Date(entry.created_at))) {
        if (entry.value >= 80) {
          aboveEighty++;
        } else {
          belowEighty++;
        }
      }
    });

    return {
      label: format(date, "MMM dd"),
      aboveEighty,
      belowEighty,
    };
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
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="aboveEighty"
            type="monotone"
            stroke={colors.aboveEighty.stroke}
            fill={colors.aboveEighty.fill}
            strokeWidth={2}
            name="Above 80%"
          />
          <Area
            dataKey="belowEighty"
            type="monotone"
            stroke={colors.belowEighty.stroke}
            fill={colors.belowEighty.fill}
            strokeWidth={2}
            name="Below 80%"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledBinChart>
  );
}

export default BinChart;
