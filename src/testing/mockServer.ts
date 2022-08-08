import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const mockedAlbums = [
  {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
  },
  {
    userId: 1,
    id: 2,
    title: 'sunt qui excepturi placeat culpa',
  },
];

export const mockedUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
];

export const mockedAlbum1Photos = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'http://placehold.it/600/92c952',
    thumbnailUrl: 'http://placehold.it/150/92c952',
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'http://placehold.it/600/771796',
    thumbnailUrl: 'http://placehold.it/150/771796',
  },
];

export const mockedAlbum2Photos = [];

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/albums', (req, res, ctx) => {
    return res(ctx.json(mockedAlbums));
  }),
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json(mockedUsers));
  }),
  rest.get(
    'https://jsonplaceholder.typicode.com/albums/1/photos',
    (req, res, ctx) => {
      return res(ctx.json(mockedAlbum1Photos));
    }
  ),
  rest.get(
    'https://jsonplaceholder.typicode.com/albums/2/photos',
    (req, res, ctx) => {
      return res(ctx.json(mockedAlbum2Photos));
    }
  )
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
