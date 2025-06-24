import { useForm } from "react-hook-form";

import Textarea from "../../ui/Textarea";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical"

import { useEditConfiguration } from "./useEditConfiguration";

function FormAppConfig({ appConfigToEdit = {}, onCloseModal }) {
    const { isEditing, editConfig } = useEditConfiguration();
    const isWorking = isEditing;

    const { id: editId, ...editValues } = appConfigToEdit;

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: editValues,
    });
    const { errors } = formState;

    const onSubmit = (data) => {
        editConfig(
            { appConfigData: { ...data }, id: editId },
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

            <FormRowVertical label="Email Recipients" error={errors?.email_recipients?.message}>
                <Textarea
                    type="text"
                    id="email_recipients"
                    disabled={isWorking}
                    {...register("email_recipients", {
                    })}
                />
            </FormRowVertical>

            <FormRowVertical label="SMS Recipients" error={errors?.sms_recipients?.message}>
                <Textarea
                    type="text"
                    id="sms_recipients"
                    disabled={isWorking}
                    {...register("sms_recipients", {
                    })}
                />
            </FormRowVertical>

            <FormRow>
                <Button disabled={isWorking}>
                    Update
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

export default FormAppConfig;
