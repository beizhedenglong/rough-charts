import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);  

configure(require.context('../stories', true, /\.stories\.(tsx|mdx)$/), module);
