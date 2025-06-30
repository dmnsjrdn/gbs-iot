import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Checkbox from "../../ui/Checkbox";
import { useCreateUser } from "./useCreateUser";
import { useEditUser } from "./useEditUser";

function FormUser({ userToEdit = {}, onCloseModal }) {
    const isEditSession = Boolean(Object.keys(userToEdit).length);

    const [isActive, setIsActive] = useState(userToEdit?.is_active ?? true);
    const [photoImage, setPhotoImage] = useState(userToEdit?.photo_image ?? "");

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession ? userToEdit : {},
    });

    const { errors } = formState;

    const { isCreating, createUser } = useCreateUser();
    const { isEditing, editUser } = useEditUser();
    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {
        const userData = { ...data, is_active: isActive, photo_image: photoImage };

        if (isEditSession) {
            editUser(
                { newUserData: userData, id: userToEdit.id },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        } else {
            createUser(userData, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },
            });
        }
    };

    const onError = (errors) => console.log(errors);

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRowVertical label="Username" error={errors?.username?.message}>
                <Input
                    type="text"
                    id="username"
                    disabled={isWorking}
                    {...register("username", { required: "This field is required" })}
                />
            </FormRowVertical>

            <FormRowVertical label="Email" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isWorking}
                    {...register("email", { required: "This field is required" })}
                />
            </FormRowVertical>

            <FormRowVertical label="Photo URL">
                <Input
                    type="text"
                    id="photo_image"
                    disabled={isWorking}
                    value={photoImage}
                    onChange={(e) => setPhotoImage(e.target.value)}
                />
            </FormRowVertical>

            <FormRowVertical>
                <Checkbox
                    id="is_active"
                    checked={isActive}
                    disabled={isWorking}
                    onChange={() => setIsActive((val) => !val)}
                >
                    Is active?
                </Checkbox>
            </FormRowVertical>

            <FormRow>
                <Button disabled={isWorking}>
                    {isEditSession ? "Update" : "Create"}
                </Button>
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
            </FormRow>
        </Form>
    );
}

export default FormUser;
