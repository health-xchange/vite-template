import { Container, Group, Anchor, Box, Title, Text } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterSimple.module.css';

const links = [
  { link: "/contact-us", label: 'Contact' },
  { link: '#', label: 'Privacy' },
  // { link: '#', label: 'Blog' },
  // { link: '#', label: 'Careers' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      // onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group align='center' justify='center'>
          <Box w={20} display={'flex'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="var(--mantine-primary-color-filled)" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" /></svg>
          </Box>
          <Text fw={'bold'} c='var(--mantine-color-gray-5)'>BlueGuard.AI</Text>
        </Group>
        {/* <MantineLogo size={28} /> */}
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}