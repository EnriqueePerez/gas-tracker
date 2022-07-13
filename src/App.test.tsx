import { screen } from '@testing-library/react';

import { App } from './containers/App';
import { render } from './test-utils';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn chakra/i);
  expect(linkElement).toBeInTheDocument();
});
