import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
interface IPublicProps {}

const Public: React.FunctionComponent<IPublicProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);

  return <>{auth.authority !== "USER_ROLE" && <> {children} </>}</>;
};

export default Public;
