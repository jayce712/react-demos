import React from 'react'
import RouterContext from './context';
import logo from './logo.svg';
import './index.css';

interface RouterProps {
  routes: Record<string, React.ReactElement>;
}

export function Router(props: RouterProps) {

  const [pathname, setPathname] = React.useState(window.location.pathname);

  const data = React.useMemo(() => {
    let element = null;

    const keys = new Set<string>();

    Object.entries(props.routes).forEach(([key, child]) => {
      keys.add(key);
      if (React.isValidElement(child) && key === pathname) {
        element = child;
      }
    });

    return {
      keys,
      element,
      value: {
        pathname,
        setPathname: (pathname: string) => {
          window.location.replace(pathname);
          setPathname(pathname);
        },
      }
    };
  }, [pathname, props.routes]);

  return (
    <div className="router">
      <div className="router-menu">
        <div className="router-menu-title">
          <img src={logo} className="App-logo" alt="logo" />
          <span>menus</span>
        </div>
        {Array.from(data.keys).map(key => (
          <div
            className={`router-menu-item ${key === data.value.pathname ? 'router-menu-item-active' : ''}`}
            key={key}
            onClick={() => { data.value.setPathname(key); }}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="router-container">
        <RouterContext.Provider value={data.value}>
          {data.element}
        </RouterContext.Provider>
      </div>
    </div>
  )
}

export function useRouter() {
  return React.useContext(RouterContext);
}