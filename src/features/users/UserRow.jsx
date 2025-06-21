import styled from "styled-components";
import { format } from "date-fns";
import {
  HiEye,
} from "react-icons/hi2";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

const Cabin = styled.div`
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

function UserRow({
  booking: {
    id: id,
    username,
    email,
    fullName,
    is_active,
    created_at
  },
}) {

  return (
    <Table.Row>
      <Stacked>
        <Cabin>{username}</Cabin>
        <span>{id}</span>
      </Stacked>

      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>{is_active}</span>
      </Stacked>

      <Stacked>
        <span>
          {format(new Date(created_at), "PPPPpppp")}
        </span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button
              icon={<HiEye />}
            >
              See details
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>

      </Modal>
    </Table.Row>
  );
}

export default UserRow;
