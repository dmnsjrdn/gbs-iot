import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import FormDustBin from "./FormDustBin";

function AddDustBin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="dust_bin-form">
                    <Button>Add new dust bin</Button>
                </Modal.Open>
                <Modal.Window name="dust_bin-form">
                    <FormDustBin />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddDustBin;
