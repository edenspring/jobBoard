const csurf = require('csurf')

const isProduction = (process.env.NODE_ENV || 'development') === 'production'


const csurfConfig = csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "lax",
        httpOnly: true,
    }
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
  }

export default async function csrf(req, res, next) {
    await runMiddleware(req, res, csurfConfig)
}