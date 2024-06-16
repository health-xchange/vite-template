import { Image, Accordion, Grid, Container, Title, Paper } from '@mantine/core';
import image from './image.svg';
import classes from './FaqWithImage.module.css';
import React from 'react';

interface FaqWithImageProps {
}

export const FaqWithImage: React.FC<FaqWithImageProps> = ({}) => {
  return (
    <div className={classes.wrapper}>
      <Container size="md">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
              <Accordion.Item className={classes.item} value="reset-password">
                <Paper shadow='xs'>
                  <Accordion.Control>I&#39;m not tech-savvy. Can I still use BlueGuard AI effectively?</Accordion.Control>
                  <Accordion.Panel>
                    Absolutely! BlueGuard AI is designed to be user-friendly for everyone. After you fill out a
                    simple initial form on our website, a human agent will reach out to you to guide you
                    through the next steps. No technical knowledge is needed to use our services. We make
                    it easy to contest your insurance claim denials.
                  </Accordion.Panel>
                </Paper>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Paper shadow='xs'>
                  <Accordion.Control>How does BlueGuard AI help with denied medical claims?</Accordion.Control>
                  <Accordion.Panel>
                    BlueGuard AI combines the expertise of skilled human agents with advanced AI
                    technology to review and contest unfair medical insurance claim denials. For a
                    flat fee of $25, we meticulously analyze your claim, identify errors or oversights,
                    and advocate on your behalf to get your claim approved. If we don&#39;t succeed, you
                    receive a full refund.
                  </Accordion.Panel>
                </Paper>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Paper shadow='xs'>
                  <Accordion.Control>What makes BlueGuard AI different from other claim assistance services?</Accordion.Control>
                  <Accordion.Panel>
                    Unlike other services, BlueGuard AI focuses on leveraging AI in conjunction with
                    human expertise to address the complexities of insurance claims. We are
                    committed to affordability and transparency with our flat-rate pricing and no-
                    success, no-fee guarantee. We don’t get paid unless your claim is approved!
                  </Accordion.Panel>
                </Paper>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Paper shadow='xs'>
                  <Accordion.Control>
                    My claim appeal got denied again, how do I get a refund?
                  </Accordion.Control>
                  <Accordion.Panel>
                    If you’re claim got denied again, reach out to us and we can help you look at
                    alternative ways to get approved, If you still can’t get closure, all you have to do
                    is send us an email with your receipt (in your email) and a copy of the official
                    denial email in which your insurer denied your appeal. We’ll refund your
                    payment!
                  </Accordion.Panel>
                </Paper>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}