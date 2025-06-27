import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const [isSubmit, setIsSubmit] = useState(false);

  const { login, isLoading } = useLogin();

  const submitForm = ({ email, password }) => {
    setIsSubmit(true);
    login({ email, password }, { onSuccess: reset, onError: () => setIsSubmit(false), reset });
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)} id="loginForm">
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          className="field-tc"
          type="text"
          name="email"
          placeholder="Email address"
          {...register("email", {
            required: "This field is required"
          })}
          disabled={isSubmit}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          className="field-tc"
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", {
            required: "This field is required"
          })}
          disabled={isSubmit}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button className="button-login"
          size="large"
          disabled={isSubmit}>
          {!isSubmit ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );



  // const initValues = { email: "", password: "" }
  // const [formValues, setFormValues] = useState(initValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const { login, isLoading } = useLogin();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmit(true);
  //   setFormErrors(validate(formValues));
  //   if (Object.keys(formErrors).length !== 0)
  //     login(formValues,
  //       {
  //         onError: () => {
  //           setFormValues(initValues);
  //           setIsSubmit(false);
  //         },
  //       });
  // }

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     // swallow
  //   } else {
  //     setIsSubmit(false);
  //   }
  // }, [formErrors]);

  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!regex.test(values.email)) {
  //     errors.email = "Invalid email format "
  //   }
  //   if (!values.password) errors.password = "Password is required";
  //   return errors;
  // }

  // return (
  //   <Form onSubmit={handleSubmit} id="loginForm">
  //     <FormRowVertical label="Email address" error={formErrors.email}>
  //       <Input
  //         className="field-tc"
  //         type="text"
  //         name="email"
  //         placeholder="Email address"
  //         value={formValues.email}
  //         onChange={handleChange}
  //         disabled={isSubmit}
  //       />
  //     </FormRowVertical>
  //     <FormRowVertical label="Password" error={formErrors.password}>
  //       <Input
  //         className="field-tc"
  //         type="password"
  //         name="password"
  //         placeholder="Password"
  //         value={formValues.password}
  //         onChange={handleChange}
  //         disabled={isSubmit}
  //       />
  //     </FormRowVertical>
  //     <FormRowVertical>
  //       <Button className="button-login"
  //         size="large"
  //         disabled={isSubmit}>
  //         {!isSubmit ? "Log in" : <SpinnerMini />}
  //       </Button>
  //     </FormRowVertical>
  //   </Form>
  // );
}

export default LoginForm;