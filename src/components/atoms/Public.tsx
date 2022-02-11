import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
interface IPublicProps {

}

const Public: React.FunctionComponent<IPublicProps> = ({ children }) => {
  const authenticated = useSelector((state: RootState) => state.auth.status.authenticated);

  return (
    <>
      {!authenticated &&
        <> {children} </>
      }
    </>
  );
};

export default Public;
