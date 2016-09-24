import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import App from '../../../src/App'

export default function render(path) {
  // first create a context for <ServerRouter>, it's where we keep the
  // results of rendering for the second pass if necessary
  const context = createServerRenderContext()

  // render the first time
  let markup = renderToString(
    <ServerRouter
      location={path}
      context={context}
    >
      <App/>
    </ServerRouter>
  )

  // get the result
  const result = context.getResult()

  // the result will tell you if it redirected, if so, we ignore
  // the markup and send a proper redirect.
  if (result.redirect) {
    return {
      statusCode: 301,
      headers: {
        Location: result.redirect.pathname
      }
    }
  } else {
    let statusCode = 200
    // the result will tell you if there were any misses, if so
    // we can send a 404 and then do a second render pass with
    // the context to clue the <Miss> components into rendering
    // this time (on the client they know from componentDidMount)
    if (result.missed) {
      statusCode = 404
      markup = renderToString(
        <ServerRouter
          location={path}
          context={context}
        >
          <App/>
        </ServerRouter>
      )
    }
    return {
      statusCode: statusCode,
      body: markup
    }
  }
}
