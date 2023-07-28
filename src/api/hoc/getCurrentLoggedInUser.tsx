import CarbonORM from "CarbonORM";
import {iUsers} from "variables/C6";

export default function () : iUsers | undefined {

    const bootstrap = CarbonORM.instance;

    // @ts-ignore
    return bootstrap.state.users?.find(user => user.ID === bootstrap.state.id)

}