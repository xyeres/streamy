import { render, fireEvent } from 'test-utils'
import { Layout } from '../../Layout'
import TracklistItem from '../../Tracklist/TracklistItem'
import * as nextRouter from 'next/router';
import { act } from 'react-dom/test-utils';


nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/search' }));


describe('Player', () => {
  it('control bar renders when song is loaded', async () => {
    const song = {
      album: "Bed Of Humility - Single",
      artist: "United Pursuit",
      year: 2021,
      diskOf: null,
      albumSlug: "bed-of-humility-single",
      songUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Fbed-of-humility-single%2Ffd50008e-7b59-4dec-99b1-2a1c994cf47b01bedofhumility.mp3?alt=media&token=30348317-b23d-4ea1-b0af-41629fdf1503",
      title: "Bed Of Humility",
      diskNo: null,
      slug: "bed-of-humility",
      artistSlug: "united-pursuit",
      trackOf: 1,
      playCount: 3,
      coverUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Fbed-of-humility-single%2F7b9e0d78-96a9-45ef-811f-ac77b045f344cover.jpeg?alt=media&token=712934cf-2b4f-4f87-a7b2-9702c319f11d",
      genre: [
        "Christian",
        "gospel"
      ],
      format: {
        numberOfChannels: 2,
        numberOfSamples: 10157184,
        lossless: false,
        codecProfile: "CBR",
        codec: "MPEG 1 Layer 3",
        bitrate: 192000,
        trackInfo: [],
        tagTypes: [
          "ID3v2.2"
        ],
        sampleRate: 44100,
        container: "MPEG",
        duration: 230.32163265306122
      },
      trackNo: 1,
      artists: [
        "United Pursuit"
      ],
      id: "6RuoCg8L7YrHDR0109jC"
    }

    const loadStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'load')
      .mockImplementation(() => { })

    render(
      <Layout>
        <TracklistItem song={song} index={0} listId="23j4kl2j42l3" listSongs={[song]} thumbnail />
      </Layout>
    )

    const songItem = screen.getByText(/Bed Of Humility/i)
    
    let playerBar = screen.queryByTestId('player-control-bar')
    expect(playerBar).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(songItem)
    })

    playerBar = screen.queryByTestId('player-control-bar')
    expect(playerBar).toBeInTheDocument()
    expect(loadStub).toHaveBeenCalled()
    loadStub.mockRestore()
  })
})

