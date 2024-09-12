import { AuthData } from "../../types/type";
import { axiosClient } from "../client";
import { urls } from "../urls";



export async function login(data: AuthData): Promise<any> {
  const response = await axiosClient().post(urls.auth.login, data);
  return response.data;
}

export async function signup(data: AuthData): Promise<any> {
  const response = await axiosClient().post(urls.auth.signup, data);
  return response.data;
}
