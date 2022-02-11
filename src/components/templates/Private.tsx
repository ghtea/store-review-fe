import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

interface IPrivateProps {}

const Private: React.FunctionComponent<IPrivateProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);

  return <>{auth.authority === "USER_ROLE" && <> {children} </>}</>;
};

export default Private;
