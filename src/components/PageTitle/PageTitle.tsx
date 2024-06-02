import { Title } from '@mantine/core';
import classes from './PageTitle.module.css';

export function PageTitle({ title }: { title: string }) {
  return <Title pb={20} pos="sticky" className={classes.title}>{title}</Title>;
}
