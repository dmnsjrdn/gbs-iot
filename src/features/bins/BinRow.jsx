import styled from "styled-components";
import { format } from "date-fns";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { useDeleteBin } from "./useDeleteBin";
import FormBin from "./FormBin";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Bin = styled.div`
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

function BinRow({ row }) {

  const {
    bin,
    is_active,
    created_at
  } = row;

  const { isDeleting, deleteBin } = useDeleteBin();

  const activeStatus = {
    "true": "green",
    "false": "silver",
  };

  return (
    <Table.Row>

      <Stacked>
        <Bin>{bin}</Bin>
      </Stacked>

      <Tag type={activeStatus[is_active]}>{is_active?.toString()}</Tag>

      <Stacked>
        {format(new Date(created_at), "PPPPpppp")}
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bin} />
          <Menus.List id={bin}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <FormBin binToEdit={row} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>

    </Table.Row>
  );
}

export default BinRow;
