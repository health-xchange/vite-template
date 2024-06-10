import { NavLink, useNavigate } from 'react-router-dom';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
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
import { MantineLogo } from '@mantinex/mantine-logo';
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
import useNewClaim from '@/hooks/useNewClaim';


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { createNewClaim } = useNewClaim();
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
          <MantineLogo size={30} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  {/* <Anchor href="#" fz="xs">
                    View all
                  </Anchor> */}
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <NavLink to="/contact-us" className={classes.link}>
              Contact Us
            </NavLink>
            <NavLink to="/privacy-policy" className={classes.link}>
              Privacy Statement
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            {
              isLoggedIn && userInfo ? <ProfileMenu user={userInfo} /> :
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
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Sign in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
