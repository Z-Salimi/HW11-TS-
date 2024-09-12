import { ErrorResponseData } from "../types/type";
import { removeSessionToken } from "./session-manager";
import { toast } from "./toast";
import { AxiosError } from "axios";


export const errorHandler = (error: AxiosError<ErrorResponseData>): void => {
  const message = error.response?.data?.message;
  if (typeof message === "string") {
    toast(message);
  } else if (Array.isArray(message)) {
    for (const messageText of message) {
      toast(messageText);
    }
  }
  const statusCode = Number(error.response?.data?.statusCode || 0);
  if (statusCode === 403) {
    toast("Please Login again");
    removeSessionToken();

    setTimeout(() => {
      window.location.href = "../login";
    }, 3000);
  }
};
