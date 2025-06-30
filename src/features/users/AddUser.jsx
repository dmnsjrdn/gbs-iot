import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import FormUser from "./FormUser";

function AddUser() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="user-form">
                    <Button>Add new user</Button>
                </Modal.Open>
                <Modal.Window name="user-form">
                    <FormUser />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddUser;
