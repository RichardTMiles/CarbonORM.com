import CarbonORM from "CarbonORM";
import publicRoutes from "routes/publicRoutes";


export default function Public() {

        console.log('PUBLIC JSX RENDER');
        return CarbonORM.instance.subRoutingSwitch(publicRoutes());

}
