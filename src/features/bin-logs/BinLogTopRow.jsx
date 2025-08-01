import styled from "styled-components";
import { format } from "date-fns";
import {
  HiEye,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

const BinLog = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function BinLogTopRow({
  row: {
    id: id,
    bin: { bin },
    value,
    created_at
  },
}) {

  return (
    <Table.Row>

      <Stacked>
        <BinLog>{bin}</BinLog>
        <span>{id}</span>
      </Stacked>

      <Tag type={value > 80 ? "red" : "green"}>{value}%</Tag>

      <Stacked>
        <span>
          {format(new Date(created_at), "PPPPpppp")}
        </span>
      </Stacked>
      
    </Table.Row>
  );
}

export default BinLogTopRow;
