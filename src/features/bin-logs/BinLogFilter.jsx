import Filter from "../../ui/Filter";

function BinLogFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "1", label: "Today" },
        { value: "7", label: "Last 7 days" },
      ]}
      active="1"
    />
  );
}

export default BinLogFilter;
