import React from 'react';
import Breadcrumb from 'layouts/AdminLayout/Breadcrumb';


import useWindowSize from '../../../../hooks/useWindowSize';

const NavLeft = () => {
  const windowSize = useWindowSize();

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <React.Fragment>
      <div className='p-4 pb-0'> 
      <Breadcrumb />
      </div>
    </React.Fragment>
  );
};

export default NavLeft;
