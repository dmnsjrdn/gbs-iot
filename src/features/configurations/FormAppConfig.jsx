import { useForm } from "react-hook-form";
import { useState } from "react";

import Textarea from "../../ui/Textarea";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical"
import Checkbox from "../../ui/Checkbox";

import { useEditConfiguration } from "./useEditConfiguration";

function FormAppConfig({ appConfigToEdit = {}, onCloseModal }) {
    const { isEditing, editConfig } = useEditConfiguration();
    const isWorking = isEditing;

    const { id: editId, ...editValues } = appConfigToEdit;


    const [isEnable, setIsEnable] = useState(editValues.enable_email_notif);

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: editValues,
    });
    const { errors } = formState;

    const onSubmit = (data) => {
        editConfig(
            { appConfigData: { ...data, enable_email_notif: isEnable}, id: editId },
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
            <i>This field accepts comma delimited data, all email entered here will receive email notification.</i>
            <br />
            <i>Please enter the data in <strong>one line</strong>.</i>

            <FormRowVertical>
                <Checkbox
                    id="enable_email_notif"
                    checked={isEnable}
                    disabled={isWorking}
                    onChange={() => setIsEnable((enable) => !enable)}>
                    Enable email notification?
                </Checkbox>
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
