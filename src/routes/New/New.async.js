// @flow
import { h } from "preact";
import AsyncRoute from "preact-async-route";

import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

type AsyncRouteProps = {
  path: string,
  [key: string]: ?mixed
};

export default ({ path, ...props }: AsyncRouteProps) => (
  <AsyncRoute
    path={path}
    getComponent={() => import("./New").then(mod => mod.default)}
    loading={LoadingComponent}
    {...props}
  />
);
