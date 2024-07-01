import { NavLink, useNavigate } from 'react-router-dom';
import {
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconList,
  IconPlus,
  IconChevronDown,
} from '@tabler/icons-react';
import { useRecoilState } from 'recoil';
import classes from './HeaderMegaMenu.module.css';
import { atomAuthState } from '../../state/atoms';
import ProfileMenu from '@/ReusableComps/ProfileMenu/ProfileMenu';
import { useClaim } from '@/hooks/useClaim';

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { createNewClaim } = useClaim();
  const [loginState] = useRecoilState(atomAuthState);
  const { isLoggedIn, userInfo } = loginState;

  const headerMenuItems = [
    {
      icon: IconList,
      id: 'claims',
      title: 'Claims',
      href: '/claims',
      description: 'View the list of claims',
    },
    {
      icon: IconPlus,
      id: 'new-claim',
      title: 'New Claim',
      onClick: createNewClaim,
      description: 'Get support for your new claim',
    },
  ];

  const links = headerMenuItems.map((item) => (
    <NavLink to={item.href ?? '#'} onClick={item.onClick} key={item.id}>
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </NavLink>
  ));

  return (
    <Box pb={80}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Box w={40} p={0}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="var(--mantine-primary-color-filled)" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" /></svg>
            </Box>
            <Text size="xl" fw="bold" c="var(--mantine-color-gray-7)">BlueGuardAI</Text>
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
            <NavLink to="/contact-us" className={classes.link}>
              Contact Us
            </NavLink>
            <NavLink to="/legal-notice" className={classes.link}>
              Legal Notice
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            {
              (isLoggedIn && userInfo) ? <ProfileMenu user={userInfo} /> :
                <>
                  <Button
                    variant="default"
                    onClick={() => navigate('/login')}>Sign in
                  </Button>
                  <Button onClick={() => navigate('/register')}>Register</Button>
                </>
            }
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {
              (isLoggedIn && userInfo && userInfo.firstName && userInfo.lastName) ? <ProfileMenu user={userInfo} /> :
                <>
                  <Button variant="default">Sign in</Button>
                  <Button>Sign up</Button>
                </>
            }
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
