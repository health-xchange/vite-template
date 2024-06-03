import { Loader, createTheme } from '@mantine/core';
import RingLoader from './ReusableComps/RingLoader';

export const theme = createTheme({
  /** Put your mantine theme override here */
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
  },
});
