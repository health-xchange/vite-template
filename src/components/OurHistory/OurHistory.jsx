import { Paper, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './OurHistory.module.css';

const data = [
  {
    title: 'Denied claims in Medicare',
    stats: '~50M',
    description: '24% more than in the same month last year, 33% more that two years ago',
  },
  {
    title: 'were appealed again',
    stats: 'less than 1%',
    description: '13% more compared to last month, 97% satisfaction rate',
  },
  {
    title: 'strain for avg american',
    stats: '$1000 bill',
    description: '100 orders were completed this month, 97% satisfaction rate',
  },
];

export function OurHistory() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      {/* <Text className={classes.description}>{stat.description}</Text> */}
    </div>
  ));
  return (
    <Paper radius="md" className={classes.card} mt={20} back>
      <Title className={classes.title}>The Problem</Title>
      <div className={classes.root}>
        {stats}
      </div>
    </Paper>
  );
}
