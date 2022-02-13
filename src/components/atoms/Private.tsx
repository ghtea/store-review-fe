import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

interface IPrivateProps {
}

const Private: React.FunctionComponent<IPrivateProps> = ({ children }) => {
  const authenticated = useSelector((state: RootState) => state.auth.authenticated);

  return (
    <>
      {authenticated &&
        <> {children} </>
      }
    </>
  );
};

export default Private;
