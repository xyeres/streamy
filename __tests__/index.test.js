import { render, screen } from 'test-utils'

import Grid from '../components/Home/Grid';
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/search' }));

describe('Home', () => {
  it('renders a grid of albums', () => {
    render(
      <Grid />
    )

    const heading = screen.getByRole('heading', {
      name: /newly added/i,
    })


    expect(heading).toBeInTheDocument()
  })
})