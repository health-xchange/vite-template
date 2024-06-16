import { FooterSimple } from '@/components/FooterSimple/FooterSimple';
import ClaimTimeLine from '@/components/Timeline/Timeline';
import { Container, Grid, GridCol, Transition } from '@mantine/core';
import { ReactNode } from 'react';

interface ClaimLayoutProps {
  children: ReactNode;
  activeBullet: number;
}

const ClaimLayout: React.FC<ClaimLayoutProps> = ({ children, activeBullet }) => {
  return (
    <Container size="md">
      <Grid>
        <GridCol span={3}>
          <ClaimTimeLine
            activeBullet={activeBullet}
            items={[
              {
                bulletId: 1,
                title: 'Primary details',
                time: new Date(),
                description: 'Provide information about your declined claim',
              },
              {
                bulletId: 2,
                title: 'Payment',
                time: new Date(),
                lineVariant: 'dashed',
                description: "You will get full refund if we couldn't get your claim approved.",
              },
              {
                bulletId: 3,
                title: 'Additional details',
                time: new Date(),
                description:
                  'Provide as much information as you have. It will be helpful for us to understand more.',
              },
            ]}
          />
        </GridCol>
        <GridCol span={9} style={{ borderLeft: '1px solid #d9d4d461', paddingLeft: 20 }}>
          <Transition mounted transition="slide-up" duration={400} timingFunction="ease">
            {(transitionStyles) => <div style={transitionStyles}>{children}</div>}
          </Transition>
        </GridCol>
      </Grid>
      <FooterSimple />
    </Container>
  );
};

export default ClaimLayout;
