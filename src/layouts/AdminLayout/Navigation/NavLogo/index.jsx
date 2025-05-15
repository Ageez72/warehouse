import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import logo from '../../../../assets/images/logo.jpg';

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="/dashboard" className="b-brand">
          <div className="b-bg">
            <img src={logo} />
          </div>
          <span className="b-title">Vision Edge</span>
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
