import styled from "styled-components";
import { format } from "date-fns";
import { HiPencil } from "react-icons/hi2";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import FormAppConfig from "./FormAppConfig";
import Tag from "../../ui/Tag";

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

function AppConfigRow({ row }) {

  const {
    id: id,
    email_recipients,
    enable_email_notif,
    modified_at
  } = row;

  const enableStatus = {
    "true": "green",
    "false": "silver",
  };

  return (
    <Table.Row>

      <Stacked>
        <span>{!!(email_recipients) ? email_recipients : "--"}</span>
      </Stacked>

      <Stacked>
        <Tag type={enableStatus[enable_email_notif]}>{enable_email_notif?.toString()}</Tag>
      </Stacked>

      <Stacked>
        {format(new Date(modified_at), "PPPPpppp")}
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
            <FormAppConfig appConfigToEdit={row} />
          </Modal.Window>

        </Menus.Menu>
      </Modal>

    </Table.Row>
  );
}

export default AppConfigRow;
