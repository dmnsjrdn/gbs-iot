import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import FormBin from "./FormBin";

function AddBin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="bin-form">
                    <Button>Add new bin</Button>
                </Modal.Open>
                <Modal.Window name="bin-form">
                    <FormBin />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddBin;
