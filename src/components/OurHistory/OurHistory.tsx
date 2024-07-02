import { Paper, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './OurHistory.module.css';

const data = [
  {
    title: 'Claim queries we got',
    stats: '23,123',
    description: '24% more than in the same month last year, 33% more that two years ago',
  },
  {
    title: 'Successful claims',
    stats: '20,321',
    description: '13% more compared to last month, 97% satisfaction rate',
  },
  {
    title: 'Ongoing claims',
    stats: '1,994',
    description: '100 orders were completed this month, 97% satisfaction rate',
  },
];

export function OurHistory() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return (
    <Paper radius="md" className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} radius={10} size={60} w={200} pos="relative" top="30px">
        <Title>Our History</Title>
      </ThemeIcon>
      <div className={classes.root}>
        {stats}
      </div>
    </Paper>
  );
}
