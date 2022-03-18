import { render, screen } from 'test-utils'
import Search from '../pages/search';

import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/search' }));

describe('Search', () => {
  it('renders on page correctly', () => {
    render(
      <Search />
    )


    const heading = screen.getByRole('heading', {
      name: /something missing/i,
    })

    const feedbackLink = screen.getByRole('link', {
      name: "feedback"
    })

    const searchInput = screen.getByTestId('searchInput')

    expect(heading).toBeInTheDocument()
    expect(feedbackLink).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveValue("")
    expect(searchInput).toHaveAttribute("placeholder", "Artist, album, song")
  })
})