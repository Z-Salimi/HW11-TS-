import { AxiosError } from "axios";
import { signup } from "../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";
import { ErrorResponseData } from "../types/type";

const signupForm = document.getElementById("signup-form") as HTMLFormElement;
const usernameInput = signupForm.querySelector("input[name='username']") as HTMLInputElement;
const passwordInput = signupForm.querySelector("input[name='password']") as HTMLInputElement;
const signupButton = signupForm.querySelector("button[type='submit']") as HTMLButtonElement;

const checkInputs = (): void => {
  if (usernameInput.value && passwordInput.value) {
    signupButton.classList.add("bg-opacity-100");
    signupButton.classList.remove("bg-opacity-15");
  } else {
    signupButton.classList.add("bg-opacity-15");
    signupButton.classList.remove("bg-opacity-100");
  }
};

usernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

signupForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  try {
    const response = await signup({
      username: usernameInput.value,
      password: passwordInput.value,
    });
    setSessionToken(response.token);
    toast("Successfully signed up", "success");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  } catch (error) {
    errorHandler(error as AxiosError<ErrorResponseData>);
  }
});
