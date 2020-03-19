import React from 'react';

export default React.createContext({
  pathname: '',
  setPathname: (href: string) => { },
});