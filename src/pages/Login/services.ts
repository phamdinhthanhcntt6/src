import { IFormLogin } from "@/pages/Login/data"
import RequestHelper from "@/utils/RequestHelper"

export const loginCMS = async (data: IFormLogin) => {
    const res = await RequestHelper.post({
        url: '/v1/cms/admin/login',
        data
    })

    return res
}