import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Footer from 'components/footer';
import Header from 'components/header';
import UserStore from 'store/user';

interface LayoutProps {
  userStore: UserStore;
}

const Layout: FC<LayoutProps> = observer(({ children, userStore }) => {
  const { user } = userStore;
  console.info('user in layout', user);
  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
});

export default Layout;
