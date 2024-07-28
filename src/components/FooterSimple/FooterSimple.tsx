import { Container, Group, Anchor, Box, Text, Image } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import classes from './FooterSimple.module.css';
import brandLogo from '../../../assets/img/logo.png';

const links = [
  { link: '/contact-us', label: 'Contact' },
  { link: '/legal-notice', label: 'Privacy' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor
      component={NavLink}
      c="dimmed"
      key={link.label}
      to={link.link}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group align="center" justify="center">
          <Image w={120} src={brandLogo} />
        </Group>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
