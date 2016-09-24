import render from './render'

export default function handle(event, ctx) {
  const {
    statusCode = 200,
    headers = {},
    body = ""
  } = render(event.path.replace("/index", ""))

  ctx.succeed({
    statusCode: statusCode,
    headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=60",
        ...headers
    },
    body: `
      <!DOCTYPE html>

      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>React API Gateway + Lambda test</title>
      </head>

      <body>

        <div id="app">${body}</div>

        <script src="/assets/bundle.js"></script>
      </body>
      </html>
    `
  })
}
