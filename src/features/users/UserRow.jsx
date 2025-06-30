import styled from "styled-components";
import { format } from "date-fns";
import { HiPencil } from "react-icons/hi2";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import FormUser from "../users/FormUser";

const User = styled.div`
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

function UserRow({ row }) {

  const {
    id: id,
    username,
    email,
    fullName,
    is_active,
    created_at
  } = row;

  const activeStatus = {
    "true": "green",
    "false": "silver",
  };

  return (
    <Table.Row>

      <Stacked>
        <User>{username}</User>
        <span>{id}</span>
      </Stacked>

      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Tag type={activeStatus[is_active]}>{is_active.toString()}</Tag>

      <Stacked>
        {format(new Date(created_at), "PPPPpppp")}
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <FormUser userToEdit={row} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>

    </Table.Row>
  );
}

export default UserRow;
