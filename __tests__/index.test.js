import { render } from 'test-utils'
import { CoverGrid } from '../components/CoverGrid';

describe('Home', () => {
  it('renders a skeleton grid of albums', () => {
    const { getByText } = render(
      <CoverGrid
        path="/album"
        keywords={{ field: 'tags', opStr: 'array-contains', value: 'new' }}
        swrkey="recentlyAdded"
      />
    )

    const album = getByText(/Mystic river/i)

    expect(album).toBeInTheDocument()

  })
})