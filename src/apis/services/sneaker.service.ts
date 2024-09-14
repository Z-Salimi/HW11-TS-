import { SneakerParams } from "../../types/type";
import { axiosClient } from "../client";
import { urls } from "../urls";



export async function getBrands(): Promise<any> {
    const response = await axiosClient().get(urls.sneaker.brands);
    return response.data;
}

export async function getSneakers(params: SneakerParams): Promise<any> {
    const response = await axiosClient().get(urls.sneaker.list, { params: params });
    return response.data;
}

export async function findSneaker(id: string): Promise<any> {
    const response = await axiosClient().get(urls.sneaker.find(id));
    return response.data;
}
