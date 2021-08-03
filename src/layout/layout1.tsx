import * as React from 'react';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => (
  <div>
    <div>this is layout</div>
    {children}
  </div>
);

export default Layout;
