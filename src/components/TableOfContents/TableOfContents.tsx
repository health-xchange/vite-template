import cx from 'clsx';
import { Box, Text, Group, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import classes from './TableOfContents.module.css';
import { TocOptions } from '@/interfaces/common';

export function TableOfContentsFloating(props: { options: TocOptions[], setActiveIdx: (idx: number) => void, activeIdx?: number }) {
  const items = props.options.map((item, index) => (
    <Box<'a'>
      component="a"
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        props.setActiveIdx(index);
      }}
      key={item.label}
      className={cx(classes.link, { [classes.linkActive]: props.activeIdx === index })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
    >
      {item.label}
    </Box>
  ));

  return (
    <div className={classes.root}>
      <Group mb="md">
        <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(calc(${props.activeIdx} * var(--link-height) + var(--indicator-offset)))`,
          }}
        />
        {items}
      </div>
    </div>
  );
}
