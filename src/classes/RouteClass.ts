import { RouteType } from "utils/types";

class RouteClass {
    component: React.VFC<{}>;
    path: string;
    isIndex: boolean;
    isAnonymous: boolean;
    routeParamNames?: string[];

    constructor({ component, path, isIndex, isAnonymous, routeParamNames }: RouteType) {
        this.component = component;
        this.path = path;
        this.isIndex = isIndex;
        this.isAnonymous = isAnonymous;
        this.routeParamNames = routeParamNames;
    }

    public getPathName = () => {
        const flatRouteParamNames = this.routeParamNames?.map(attr => `/:${attr}`).join();
        return `${this.path}${flatRouteParamNames ?? ''}`;
    }

    public getPathRoute = (routeParamValues?: string[]) => {
        if (!this.routeParamNames || (routeParamValues && routeParamValues.length === this.routeParamNames.length)) {
            const flatRouteParamValues = routeParamValues?.map(attr => `/${attr}`).join();
            return `${this.path}${flatRouteParamValues ?? ''}`;
        }

        throw Error(`This path requires ${this.routeParamNames.length} attributes, but got only ${routeParamValues?.length}`);
    }
}

export default RouteClass;
