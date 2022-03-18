import { render, screen } from 'test-utils'
import { Tracklist } from '../components/Tracklist';
import secondsToTime from '../components/Player/secondsToTime'

describe("Album Tracklist", () => {
  let expectedProps;

  beforeAll(() => {
    expectedProps = {
      thumbnail: true,
      listId: 'EOsTVelueb8nchPRUvug',
      listDoc: {
        "data": {
          "songs": [
            "G5PrT3eeS97EePiQeg1k",
            "J9NCu1ODLamuNjA865vG",
            "6RuoCg8L7YrHDR0109jC",
            "4G1sgvn4Bp9P2Ffgjqc0"
          ],
          "title": "Just the New Stuff",
          "listType": "playlist",
          "id": "EOsTVelueb8nchPRUvug",
          "coverUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/covers%2FR1-05755-0025.jpg?alt=media&token=4642c389-a0ea-4c87-981f-3776c6856841"
        },
        "isLoading": false
      },
      tracks: {
        "data": [
          {
            "trackOf": 1,
            "title": "So It Goes",
            "diskNo": null,
            "format": {
              "tagTypes": [
                "ID3v2.2"
              ],
              "bitrate": 192000,
              "numberOfSamples": 9747072,
              "sampleRate": 44100,
              "codec": "MPEG 1 Layer 3",
              "duration": 221.02204081632652,
              "trackInfo": [],
              "container": "MPEG",
              "numberOfChannels": 2,
              "codecProfile": "CBR",
              "lossless": false
            },
            "trackNo": 1,
            "artist": "Andrea Marie",
            "playCount": 2,
            "artistSlug": "andrea-marie",
            "artists": [
              "Andrea Marie"
            ],
            "coverUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Fandrea-marie%2Fso-it-goes-single%2F55cd4061-0b8d-4e47-8390-523bedb96e83cover.jpeg?alt=media&token=d964de53-98f6-4191-8617-f4f02898dd0b",
            "slug": "so-it-goes",
            "songUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Fandrea-marie%2Fso-it-goes-single%2F62ec0683-432b-4a60-9c27-7396f872679501soitgoes.mp3?alt=media&token=74d76695-739c-41a8-8f79-147b89503e22",
            "id": "G5PrT3eeS97EePiQeg1k",
            "diskOf": null,
            "year": 2020,
            "albumSlug": "so-it-goes-single",
            "album": "So It Goes - Single",
            "genre": [
              "Singer",
              "songwriter"
            ]
          },
          {
            "format": {
              "numberOfSamples": 9998208,
              "codec": "MPEG 1 Layer 3",
              "bitrate": 192000,
              "sampleRate": 44100,
              "codecProfile": "CBR",
              "container": "MPEG",
              "numberOfChannels": 2,
              "trackInfo": [],
              "duration": 226.71673469387756,
              "lossless": false,
              "tagTypes": [
                "ID3v2.2"
              ]
            },
            "coverUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Fbrock-human%2Fnationalism-single%2F53d4eed1-5ea3-43aa-a078-b7d0a05ceea3cover.jpeg?alt=media&token=5cf7b8b0-8443-4d22-bd0d-3327ed22ac38",
            "genre": [
              "Christian",
              "gospel"
            ],
            "trackNo": 1,
            "id": "J9NCu1ODLamuNjA865vG",
            "album": "Nationalism - Single",
            "artist": "Brock Human",
            "artistSlug": "brock-human",
            "artists": [
              "Brock Human"
            ],
            "trackOf": 1,
            "title": "Nationalism",
            "playCount": 1,
            "diskOf": null,
            "songUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Fbrock-human%2Fnationalism-single%2Fc9ecf456-70e7-4d59-a534-efbb19da31f901nationalism.mp3?alt=media&token=6d339206-d838-4c1d-8e31-611f6aeccd0f",
            "slug": "nationalism",
            "diskNo": null,
            "year": 2021,
            "albumSlug": "nationalism-single"
          },
          {
            "format": {
              "tagTypes": [
                "ID3v2.2"
              ],
              "lossless": false,
              "sampleRate": 44100,
              "duration": 230.32163265306122,
              "container": "MPEG",
              "trackInfo": [],
              "numberOfChannels": 2,
              "codec": "MPEG 1 Layer 3",
              "codecProfile": "CBR",
              "bitrate": 192000,
              "numberOfSamples": 10157184
            },
            "id": "6RuoCg8L7YrHDR0109jC",
            "diskOf": null,
            "coverUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Fbed-of-humility-single%2F7b9e0d78-96a9-45ef-811f-ac77b045f344cover.jpeg?alt=media&token=712934cf-2b4f-4f87-a7b2-9702c319f11d",
            "trackNo": 1,
            "album": "Bed Of Humility - Single",
            "genre": [
              "Christian",
              "gospel"
            ],
            "diskNo": null,
            "artist": "United Pursuit",
            "trackOf": 1,
            "playCount": 1,
            "year": 2021,
            "artists": [
              "United Pursuit"
            ],
            "songUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Fbed-of-humility-single%2Ffd50008e-7b59-4dec-99b1-2a1c994cf47b01bedofhumility.mp3?alt=media&token=30348317-b23d-4ea1-b0af-41629fdf1503",
            "slug": "bed-of-humility",
            "albumSlug": "bed-of-humility-single",
            "title": "Bed Of Humility",
            "artistSlug": "united-pursuit"
          },
          {
            "trackNo": 1,
            "playCount": 1,
            "albumSlug": "calm-before-the-storm-single",
            "songUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Fcalm-before-the-storm-single%2Ffe016968-f93c-4b30-b7ff-d896d56ef7eb01calmbeforethestorm.mp3?alt=media&token=8553ddb7-507a-469c-b95a-1d88ec7b4bd5",
            "artists": [
              "United Pursuit"
            ],
            "slug": "calm-before-the-storm",
            "album": "Calm Before the Storm - Single",
            "coverUrl": "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Fcalm-before-the-storm-single%2F27140535-e566-4dff-9435-0ba83f3db2f2cover.jpeg?alt=media&token=aefab426-80a4-4c93-816d-ed52c553d4b1",
            "title": "Calm Before the Storm",
            "artistSlug": "united-pursuit",
            "artist": "United Pursuit",
            "diskNo": null,
            "genre": [
              "Christian",
              "gospel"
            ],
            "trackOf": 1,
            "format": {
              "tagTypes": [
                "ID3v2.2"
              ],
              "lossless": false,
              "trackInfo": [],
              "numberOfChannels": 2,
              "codecProfile": "CBR",
              "codec": "MPEG 1 Layer 3",
              "numberOfSamples": 11290752,
              "sampleRate": 48000,
              "bitrate": 192000,
              "container": "MPEG",
              "duration": 235.224
            },
            "diskOf": null,
            "year": 2021,
            "id": "4G1sgvn4Bp9P2Ffgjqc0"
          }
        ],
        "isLoading": false
      }
    }
  })

  test('image thumbnail is next to list items', () => {
    const { getAllByRole } = render(<Tracklist {...expectedProps} />)
    const firstItem = getAllByRole('listitem')[0]
    const thumbnailImage = screen.getAllByTestId('thumbnail-image')[0]

    expect(firstItem).toHaveTextContent('1')
    expect(firstItem).toHaveTextContent(expectedProps.tracks.data[0].title)
    expect(firstItem).toHaveTextContent(expectedProps.tracks.data[0].artist)
    expect(firstItem).toHaveTextContent(secondsToTime(expectedProps.tracks.data[0].format.duration))
    expect(firstItem).toContainElement(thumbnailImage)
  })

  test('should not render copyright', () => {
    const { queryByText } = render(<Tracklist {...expectedProps} />)
    const copyright = queryByText(`©${expectedProps.listDoc.data.year} ${expectedProps.listDoc.data.artist}`)
    expect(copyright).toBeDefined()
  })
})

describe("Album Tracklist", () => {
  let expectedProps;

  beforeAll(() => {
    expectedProps = {
      listId: 'an-album-name',
      listDoc: {
        data: {
          slug: "an-album-name",
          year: 2016,
          artists: [
            "Artist Name"
          ],
          lastUpdated: {
            seconds: 1646193835,
            nanoseconds: 675000000
          },
          artist: "Artist Name",
          artistSlug: "artist-slug",
          coverUrl: "https://awebsite.com/acover.png",
          tags: [
            "studio"
          ],
          title: "An album name",
          id: "an-album-name"
        },
        isLoading: false
      },
      tracks: {
        data: [
          {
            songUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2F2a9bf362-95ad-489b-8b9c-a069bce2370f01hereandnowfeatwillreaganaayaneqd.mp3?alt=media&token=47be16f1-863b-42d0-9ab8-2281d1d8b80b",
            format: {
              duration: 270.62857142857143,
              lossless: false,
              sampleRate: 44100,
              codecProfile: "V2",
              bitrate: 303263.70777027024,
              codec: "MPEG 1 Layer 3",
              container: "MPEG"
            },
            diskNo: null,
            albumSlug: "looking-for-a-savior",
            artist: "United Pursuit",
            trackNo: 1,
            title: "Here and Now (feat Will Reagan)",
            id: "dn4xkLID2ZTcgXa8cSt7",
            genre: [
              "Christian",
              "gospel"
            ],
            diskOf: null,
            coverUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2F241bd2a7-8e75-4a96-a186-842d91119f93cover.jpeg?alt=media&token=caf784da-58df-4499-aedf-29d5ac0a86a9",
            year: 2016,
            slug: "here-and-now-feat-will-reagan-",
            album: "Looking for a Savior",
            artists: [
              "United Pursuit"
            ],
            trackOf: 6,
            artistSlug: "united-pursuit"
          },
          {
            artists: [
              "United Pursuit"
            ],
            diskOf: null,
            artist: "United Pursuit",
            songUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2Fdff6e1ba-2aff-4851-89b5-1b03f777869402everycellfeatbrockhumanaayaneqd.mp3?alt=media&token=d26fb09d-4297-4fde-bee1-b40772212f5c",
            format: {
              codecProfile: "V2",
              duration: 292.85877551020405,
              container: "MPEG",
              sampleRate: 44100,
              lossless: false,
              codec: "MPEG 1 Layer 3",
              bitrate: 302241.7881990902
            },
            genre: [
              "Christian",
              "gospel"
            ],
            year: 2016,
            artistSlug: "united-pursuit",
            trackOf: 6,
            trackNo: 2,
            id: "ZlYpvYlv5SCNH2JV8PqC",
            coverUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2Ffcd311fb-9a5e-4189-9bfa-7a99014bce2ccover.jpeg?alt=media&token=bdb1d33c-753d-41f0-a4e4-87da2a6952b9",
            albumSlug: "looking-for-a-savior",
            album: "Looking for a Savior",
            title: "Every Cell (feat Brock Human)",
            diskNo: null,
            slug: "every-cell-feat-brock-human-"
          },
          {
            slug: "oh-how-we-love-you-feat-will-reagan-",
            diskOf: null,
            trackOf: 6,
            title: "Oh How We Love You (feat Will Reagan)",
            id: "hQxPOYftMedqZMsE9gzU",
            artists: [
              "United Pursuit"
            ],
            genre: [
              "Christian",
              "gospel"
            ],
            album: "Looking for a Savior",
            format: {
              container: "MPEG",
              codec: "MPEG 1 Layer 3",
              bitrate: 304564.86330438213,
              codecProfile: "V2",
              duration: 330.8408163265306,
              lossless: false,
              sampleRate: 44100
            },
            diskNo: null,
            coverUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2F8ebe83fa-aafd-45e9-bb79-b84711a68a72cover.jpeg?alt=media&token=851316c0-ae05-470f-ae59-0f63ba56f2c5",
            songUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2F560b11ca-942b-4d78-97d4-509abb5f70ee03ohhowweloveyoufeatwillreaganaayaneqd.mp3?alt=media&token=bb00f8fb-ddc9-4f28-bdea-e04458e7141a",
            albumSlug: "looking-for-a-savior",
            artist: "United Pursuit",
            artistSlug: "united-pursuit",
            year: 2016,
            trackNo: 3
          },
          {
            artists: [
              "United Pursuit"
            ],
            songUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2Ff3fbd00f-1823-4654-b504-5d2a71b57b5b04awakemysoulfeatbrockhumanaayaneqd.mp3?alt=media&token=6c5e3ca7-0bac-4347-a0f1-11dce704848a",
            title: "Awake My Soul (feat Brock Human)",
            trackOf: 6,
            year: 2016,
            id: "jyqmvf645luOkkP27nVL",
            artistSlug: "united-pursuit",
            album: "Looking for a Savior",
            albumSlug: "looking-for-a-savior",
            format: {
              codecProfile: "V2",
              codec: "MPEG 1 Layer 3",
              container: "MPEG",
              duration: 287.3991836734694,
              lossless: false,
              bitrate: 303926.17989910924,
              sampleRate: 44100
            },
            trackNo: 4,
            coverUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2Fc894d63c-48e2-4593-a2a2-edfda0d3f8f1cover.jpeg?alt=media&token=207a17eb-bf94-4072-837b-c1960b65aa1d",
            slug: "awake-my-soul-feat-brock-human-",
            artist: "United Pursuit",
            diskNo: null,
            genre: [
              "Christian",
              "gospel"
            ],
            diskOf: null
          },
          {
            format: {
              sampleRate: 44100,
              duration: 398.6024489795918,
              codecProfile: "V2",
              codec: "MPEG 1 Layer 3",
              bitrate: 306088.6161445704,
              lossless: false,
              container: "MPEG"
            },
            album: "Looking for a Savior",
            diskOf: null,
            albumSlug: "looking-for-a-savior",
            trackNo: 5,
            trackOf: 6,
            year: 2016,
            coverUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2F17aebb09-bb95-4130-b8f1-80399471d6a1cover.jpeg?alt=media&token=135e1325-5f76-4f39-8478-0bff9e56c5b1",
            id: "KIEV6q3BYPsSGFQoiymq",
            slug: "looking-for-a-savior-feat-will-reagan-",
            songUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2Fe104ed26-acdd-487e-868c-4ae3100e135505lookingforasaviorfeatwillreaganaayaneqd.mp3?alt=media&token=de4b6929-a020-4e15-ba7a-628bc2e7b598",
            artists: [
              "United Pursuit"
            ],
            artistSlug: "united-pursuit",
            diskNo: null,
            artist: "United Pursuit",
            genre: [
              "Christian",
              "gospel"
            ],
            title: "Looking For A Savior (feat Will Reagan)"
          },
          {
            coverUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2Fd95bc0b4-3feb-4a52-abbb-62c7db1e05c8cover.jpeg?alt=media&token=b9d70ae2-5a2c-4692-befb-78bdb481ba00",
            artist: "United Pursuit",
            title: "Are You Listening (feat Brock Human)",
            diskNo: null,
            playCount: 1,
            trackOf: 6,
            diskOf: null,
            artists: [
              "United Pursuit"
            ],
            format: {
              codecProfile: "V2",
              codec: "MPEG 1 Layer 3",
              duration: 237.71428571428572,
              container: "MPEG",
              bitrate: 304993.3653846154,
              sampleRate: 44100,
              lossless: false
            },
            trackNo: 6,
            genre: [
              "Christian",
              "gospel"
            ],
            id: "9sFWB9vwUc2UThZ01Gpu",
            album: "Looking for a Savior",
            artistSlug: "united-pursuit",
            slug: "are-you-listening-feat-brock-human-",
            year: 2016,
            albumSlug: "looking-for-a-savior",
            songUrl: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Funited-pursuit%2Flooking-for-a-savior%2F882b7943-3b38-4732-96cd-d38f6660358506areyoulisteningfeatbrockhumanaayaneqd.mp3?alt=media&token=03ec824f-914b-4ecd-b92e-d36d7f77318e"
          }
        ],
        isLoading: false
      }
    }
  })

  test('should render title, artist, and cover image', () => {
    const { getByText, getByAltText, getByRole } = render(<Tracklist {...expectedProps} />)
    const title = getByText(expectedProps.listDoc.data.title)
    const artist = getByRole('heading', { name: expectedProps.listDoc.data.artist })
    const image = getByAltText(`${expectedProps.listDoc.data.title} album cover`)

    expect(title).toBeVisible()
    expect(artist).toBeVisible()
    expect(image).toBeVisible()
  })

  test('should render entire list of songs', () => {
    const { getAllByRole } = render(<Tracklist {...expectedProps} />)
    const listItems = getAllByRole('listitem')
    expect(listItems).toHaveLength(6)
  })

  test('should render title, artist, duration for each list item but not image thumbnail', () => {
    const { getAllByRole } = render(<Tracklist {...expectedProps} />)
    const firstItem = getAllByRole('listitem')[0]
    const thumbnailImage = screen.queryByTestId('thumbnail-image')

    expect(firstItem).toHaveTextContent('1')
    expect(firstItem).toHaveTextContent(expectedProps.tracks.data[0].title)
    expect(firstItem).toHaveTextContent(expectedProps.tracks.data[0].artist)
    expect(firstItem).toHaveTextContent(secondsToTime(expectedProps.tracks.data[0].format.duration))
    expect(firstItem).not.toContainElement(thumbnailImage)
  })


  test('should render copyright', () => {
    const { getByText } = render(<Tracklist {...expectedProps} />)
    const copyright = getByText(`©${expectedProps.listDoc.data.year} ${expectedProps.listDoc.data.artist}`)
    expect(copyright).toBeVisible()
  })
})

