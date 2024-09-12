import { axiosClient } from "../client";
import { urls } from "../urls";

export async function getUserInfo(): Promise<any> {
  const response = await axiosClient().get(urls.user);
  return response.data;
}
