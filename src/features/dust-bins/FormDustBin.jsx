import { useForm } from "react-hook-form";
import { useState } from "react";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical"
import Checkbox from "../../ui/Checkbox";

import { useCreateDustBin } from "./useCreateDustBin";
import { useEditDustBin } from "./useEditDustBin";

function FormDustBin({ dustBinToEdit = {}, onCloseModal }) {
    const { isCreating, createDustBin } = useCreateDustBin();
    const { isEditing, editDistBin } = useEditDustBin();
    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = dustBinToEdit;
    const isEditSession = Boolean(editId);

    const [isActive, setIsActive] = useState(
        isEditSession ? editValues.is_active : false
    );
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const onSubmit = (data) => {
        if (isEditSession)
            editDistBin(
                { newDustBinData: { ...data, is_active: isActive }, id: editId },
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else
            createDustBin(
                { ...data, is_active: isActive },
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    const onError = (errors) => {
        console.log(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}>

            <FormRowVertical label="Dust bin" error={errors?.bin?.message}>
                <Input
                    type="text"
                    id="bin"
                    disabled={isWorking}
                    {...register("bin", {
                        required: "This field is required",
                    })}
                />
            </FormRowVertical>

            <FormRowVertical>
                <Checkbox
                    id="is_active"
                    checked={isActive} 
                    disabled={isWorking}
                    onChange={() => setIsActive((active) => !active)}>
                    Is dust bin active?
                </Checkbox>
            </FormRowVertical>

            <FormRow>
                <Button disabled={isWorking}>
                    {isEditSession ? "Update" : "Create"}
                </Button>
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
            </FormRow>

        </Form >
    );
}

export default FormDustBin;
