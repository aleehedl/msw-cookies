import { createServer } from '@mswjs/http-middleware'
import { rest } from 'msw';

const host = '127.0.0.1';
const port = 8081;
const url = `http://${host}${port}`;

const handlers = [
  rest.get('/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie('foo', 'bar'),
      ctx.json({message: "See devtools network tab. I set cookie foo=bar but not bar=baz."})
    )
  }),
  rest.get('/another', async (req, res, ctx) => {
    const out = await res(
      ctx.status(200),
      ctx.json({message: "See devtools network tab. I set cookie with name=foo and value=bar, bar=baz"})
    );
    out.headers.append('set-cookie', 'foo=bar');
    out.headers.append('set-cookie', 'bar=baz');
    return out;
  }),
 
 
];

const httpServer = createServer(...handlers)
httpServer.listen(port)
console.log(`Server running on http://localhost:${port}`)