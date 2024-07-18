import { Container, Grid, GridCol, Transition } from '@mantine/core';
import { ReactNode } from 'react';
import { IconCoin, IconCurrency, IconCurrencyDollar, IconPencil, IconPennant } from '@tabler/icons-react';
import { FooterSimple } from '@/components/FooterSimple/FooterSimple';
import ClaimTimeLine from '@/components/Timeline/Timeline';

interface ClaimLayoutProps {
  children: ReactNode;
  activeBullet: number;
}

const ClaimLayout: React.FC<ClaimLayoutProps> = ({ children, activeBullet }) => (
    <Container size="md">
      <Grid>
        <GridCol span={3}>
          <ClaimTimeLine
            activeBullet={activeBullet}
            items={[
              {
                bulletId: 1,
                icon: <IconPencil />,
                title: 'Primary details',
                time: new Date(),
                description: 'Provide information about your denied claim',
              },
              {
                bulletId: 2,
                title: 'Payment',
                icon: <IconCurrencyDollar />,
                time: new Date(),
                lineVariant: 'dashed',
                description: "You will get a full refund if we don't win your case!",
              },
              {
                bulletId: 3,
                title: 'Critical details',
                icon: <IconPennant />,
                time: new Date(),
                description:
                  'Provide as much information as you can. It will be helpful for us to understand more.',
              },
            ]}
          />
        </GridCol>
        <GridCol span={9} style={{ borderLeft: '1px solid #ced4da8a', paddingLeft: 20 }}>
          <Transition mounted transition="slide-up" duration={400} timingFunction="ease">
            {(transitionStyles) => <div style={transitionStyles}>{children}</div>}
          </Transition>
        </GridCol>
      </Grid>
      <FooterSimple />
    </Container>
  );

export default ClaimLayout;
