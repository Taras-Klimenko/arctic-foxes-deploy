import { useState } from "react";
import { useRouter } from "next/navigation";
import "./SignUpForm.css";
import { UserValidator } from "@/entities/user/model/UserValidator";
import FormInput from "@/shared/ui/FormInput/FormInput";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { registerThunk } from "@/entities/user/api/UserApiThunk";

export default function SignUpForm() {
  const initialValue = { name: "", email: "", password: "" };
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [signUpData, setSignUpData] = useState(initialValue);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signUpHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateRegistrationData(signUpData);

    if (!isValid) {
      alert(validationError);
      return;
    }

    const action = await dispatch(registerThunk(signUpData));
    if (registerThunk.rejected.match(action)) {
      return;
    }
    router.push("/");
    setSignUpData(initialValue);
  };

  return (
    <div>
      <form className="form" onSubmit={signUpHandler}>
        <FormInput
          placeholder=" "
          name="name"
          type="text"
          required
          onChange={inputHandler}
          value={signUpData.name}
          label="Имя"
        />
        <FormInput
          placeholder=" "
          name="email"
          type="email"
          required
          onChange={inputHandler}
          value={signUpData.email}
          label="Почта"
        />
        <FormInput
          placeholder=" "
          name="password"
          type="password"
          required
          onChange={inputHandler}
          value={signUpData.password}
          label="Пароль"
        />
        <button className="form-action-button">Зарегистрироваться</button>
      </form>
    </div>
  );
}
