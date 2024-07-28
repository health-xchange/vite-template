import { useState } from 'react';
import { Stepper, StepperProps, Tooltip, rem } from '@mantine/core';
import { IconCheck, IconDelta } from '@tabler/icons-react';

function StyledStepper(props: StepperProps) {
  return (
    <Stepper
      styles={{
        root: {
          width: '90%',
        },

        stepBody: {
          display: 'none',
        },

        step: {
          padding: 0,
          height: 10,
        },
        stepIcon: {
          borderWidth: rem(2),
          height: rem(20),
          width: rem(20),
          minHeight: rem(20),
          minWidth: rem(20),
        },
        stepCompletedIcon: {
          margin: 'auto',
          height: rem(10),
        },
        separator: {
          marginLeft: rem(-2),
          marginRight: rem(-2),
          height: rem(5),
        },
      }}
      {...props}
    />
  );
}

const ClaimStepper = () => {
  const [active, setActive] = useState(1);
  return (
    <StyledStepper
      allowNextStepsSelect={false}
      active={active}>
      <Stepper.Step
        icon={<IconDelta />}
      />
      <Stepper.Step label="waiting_for_payment" description="waiting_for_payment" />
      <Stepper.Step label="waiting_for_additional_info" description="waiting_for_additional_info" />
      <Stepper.Step label="waiting_for_reviewer_response" description="waiting_for_reviewer_response" />
      {/* <Stepper.Step label="reviewing" description="reviewing" />
      <Stepper.Step label="waiting_for_user_response" description="waiting_for_user_response" />
      <Stepper.Step label="success" description="success" />
      <Stepper.Step label="failed" description="failed" /> */}
    </StyledStepper>
  );
};

export default ClaimStepper;
