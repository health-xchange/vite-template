import { Transition } from '@mantine/core';
import type { MantineTransition } from '@mantine/core';
import { ReactNode, useEffect, useState } from 'react';

const TransitionComp = ({ transition = 'slide-left', children }: { transition: MantineTransition | undefined, children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Transition
      mounted={isMounted}
      transition={transition}
      duration={600}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>{children}</div>}
    </Transition>
  );
};

export default TransitionComp;
