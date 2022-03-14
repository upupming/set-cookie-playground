import Koa from 'koa'
import fs from 'fs'
import https from "https"


const options: https.ServerOptions = {
  key: fs.readFileSync('./localhost+1-key.pem'),
  cert: fs.readFileSync('./localhost+1.pem'),
}

const app = new Koa();

const port = 4876
const anotherPort = 4877

app.use(ctx => {
  console.log(ctx.url)
  ctx.status = 200
  switch (ctx.url) {
    case '/':
      ctx.res.setHeader('set-cookie', `cookie_${port}_html=hello-cookie-from-html`)
      ctx.res.setHeader('Content-Type', 'text/html')
      ctx.body = fs.createReadStream('./index.html')
      break
    case '/index.js':
      ctx.res.setHeader('set-cookie', `cookie_${port}_js=hello-cookie-from-js`)
      ctx.body = `
      console.log('hello from index.js')
      fetch('https://0.0.0.0:${anotherPort}/index.js', {
        credentials: "include"
      })
        .then(data => data.text())
        .then((data) => {
          eval(data)
        })
      `
      break
    default:
      ctx.body = 'hello world'
  }
});

https.createServer(options, app.callback()).listen(port, () => {
  console.log(`https://localhost:${port}`)
});


const anotherApp = new Koa();

anotherApp.use(ctx => {
  console.log(ctx.url)
  ctx.status = 200
  // allow access from another origin
  ctx.res.setHeader('Access-Control-Allow-Origin', `https://localhost:${port}`)
  // allow set-cookie
  ctx.res.setHeader('Access-Control-Allow-Credentials', `true`)
  switch (ctx.url) {
    case '/index.js':
      ctx.res.setHeader('set-cookie', `cookie_${anotherPort}_js=hello-cookie-from-another-domain-js; SameSite=None; Secure`)
      ctx.body = `
      console.log("hello from another origin's index.js")
      `
      break
    default:
      ctx.body = 'hello world from another origin'
  }
});

// use 0.0.0.0 to differentiate from localhost
// because cookie is shared between different ports with same hostname
// see: https://stackoverflow.com/a/16328399/8242705
https.createServer(options, anotherApp.callback()).listen(anotherPort, '0.0.0.0', () => {
  console.log(`https://0.0.0.0:${anotherPort}`)
});
