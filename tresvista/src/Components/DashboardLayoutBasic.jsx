import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import Groups2Icon from '@mui/icons-material/Groups2';
import PersonIcon from '@mui/icons-material/Person';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Chats from './Chats';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Chats',
  },
  {
    segment: 'tresvista',
    title: 'Tresvista',
    icon: <Groups2Icon />,
  },
  {
    segment: 'Sarah',
    title: 'Sarah',
    icon: <PersonIcon />,
  },
  {
    segment: 'person2',
    title: 'Person2',
    icon: <PersonIcon />,
  },
  {
    segment: 'person3',
    title: 'Person3',
    icon: <PersonIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}



export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const currentNavItem = NAVIGATION.find(item => item.segment === router.pathname.replace('/', ''));  
  const demoWindow = window ? window() : undefined;
  const socket = new WebSocket('ws://localhost:9000');
  

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout >
            {Chats(currentNavItem,socket)} 
      </DashboardLayout>
    </AppProvider>
  );
}
