import { AxiosError } from "axios";
import { login } from "../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";
import { ErrorResponseData } from "../types/type";

const loginForm = document.getElementById("login-form") as HTMLFormElement;
const usernameInput = loginForm.querySelector("input[name='username']") as HTMLInputElement;
const passwordInput = loginForm.querySelector("input[name='password']") as HTMLInputElement;
const logInButton = loginForm.querySelector("button[type='submit']") as HTMLButtonElement;

const checkInputs = (): void => {
  if (usernameInput.value && passwordInput.value) {
    logInButton.classList.add("bg-opacity-100");
    logInButton.classList.remove("bg-opacity-15");
  } else {
    logInButton.classList.add("bg-opacity-15");
    logInButton.classList.remove("bg-opacity-100");
  }
};

usernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

loginForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  try {
    const response = await login({
      username: usernameInput.value,
      password: passwordInput.value,
    });
    setSessionToken(response.token);
    toast("Successfully logged in", "success");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  } catch (error) {
    errorHandler(error as AxiosError<ErrorResponseData>);
  }
});

document.getElementById("goBackButton")?.addEventListener("click", () => {
  history.back();
});
