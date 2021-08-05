import * as React from 'react';
import Footer from 'components/footer';
import Header from 'components/header';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
