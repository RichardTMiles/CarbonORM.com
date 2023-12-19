import {AxiosResponse} from "axios";
import CarbonORM from "CarbonORM";
import axiosInstance from "variables/axiosInstance";


export interface iAuthenticate {
    user_id?: string,
    authenticated?: boolean,
}

export const initialAuthenticateState: iAuthenticate = {
    user_id: undefined,
    authenticated: undefined,
}

export const authenticateUser = () => {

    axiosInstance.get<any, AxiosResponse<{
        versions: string[],
        success: boolean,
        pureWordpressPluginConfigured: boolean,
        authenticated: boolean,
        id: string,
    }, any>>('/carbon/authenticated')
        .then(res => {
            console.log("authenticate data: ", res);
            CarbonORM.instance.setState({
                user_id: res?.data?.id || '',
                pureWordpressPluginConfigured: res?.data?.pureWordpressPluginConfigured || false,
                authenticated: res?.data?.success || false,
                versions: res?.data?.versions?.sort((v1: string, v2: string) => {
                    let lexicographical = false,
                        zeroExtend = false,
                        v1parts = v1.split('.'),
                        v2parts = v2.split('.');

                    function isValidPart(x) {
                        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
                    }

                    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
                        return NaN;
                    }

                    if (zeroExtend) {
                        while (v1parts.length < v2parts.length) v1parts.push("0");
                        while (v2parts.length < v1parts.length) v2parts.push("0");
                    }

                    for (let i = 0; i < v1parts.length; ++i) {
                        if (v2parts.length === i) {
                            return 1;
                        }

                        if (v1parts[i] === v2parts[i]) {
                            // noinspection UnnecessaryContinueJS - clarity call
                            continue;
                        } else if (v1parts[i] > v2parts[i]) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }

                    if (v1parts.length !== v2parts.length) {
                        return -1;
                    }

                    return 0;

                }).reverse() ?? [],
                isLoaded: true
            });
        })
        .catch(err => {
            console.log("authenticate error: ", err);
            CarbonORM.instance.setState({
                isLoaded: true,
                authenticated: false,
                versions: ['loading error'],
            })

        })
};