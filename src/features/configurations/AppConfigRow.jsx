import styled from "styled-components";
import { format } from "date-fns";
import { HiPencil } from "react-icons/hi2";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import FormAppConfig from "./FormAppConfig";

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
    sms_recipients,
    modified_at
  } = row;

  return (
    <Table.Row>

      <Stacked>
        <span>{!!(email_recipients) ? email_recipients : "--"}</span>
      </Stacked>

      <Stacked>
        <span>{!!(sms_recipients) ? sms_recipients : "--"}</span>
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
