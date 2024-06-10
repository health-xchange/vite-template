import { ThemeIcon, Text, Avatar, Timeline } from '@mantine/core';
import { IconNode, IconSun, IconVideo } from '@tabler/icons-react';
import React, { ReactNode } from 'react';

type TimeLineItemStatus = 'completed' | 'disabled' | 'pending';

interface TimelineItem {
  bulletId: string | number;
  title: string;
  icon?: ReactNode;
  description?: string;
  time?: Date;
  lineVariant?: 'dashed' | 'solid' | 'dotted' | undefined;
  status?: TimeLineItemStatus;
}

interface ClaimTimeLine {
  items: TimelineItem[];
  activeBullet: number;
}

const ClaimTimeLine: React.FC<ClaimTimeLine> = ({ items, activeBullet }) => {
  return (
    <Timeline active={activeBullet} pos={'sticky'} top={56}>
      {items.map((item) => {
        return (
          <Timeline.Item
            lineVariant={item.lineVariant}
            key={item.bulletId}
            title={item.title}
            bullet={item.icon}
            radius={'xl'}
          >
            <Text c="dimmed" size="sm">
              {item.description}
            </Text>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export default ClaimTimeLine;
