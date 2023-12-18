import CarbonORM from "CarbonORM";
import {iUsers} from "api/rest/C6";

export default function () : iUsers | undefined {

    const bootstrap = CarbonORM.instance;

    // @ts-ignore
    return bootstrap.state.users?.find(user => user.ID === bootstrap.state.id)

}