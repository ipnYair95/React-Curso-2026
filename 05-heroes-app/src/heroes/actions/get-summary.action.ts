import { heroApi } from "../api/heroe.api"
import type { ISummaryInformationResponse } from "../interfaces/summary-information.response";

export const getSummaryAction = async () => {

    const { data } = await heroApi.get<ISummaryInformationResponse>('/summary');

    return data;

}