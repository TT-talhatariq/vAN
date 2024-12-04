const jwt = require('jsonwebtoken')

module.exports = function protect(req, res, next) {
  try {
    // get your token
    const authHeaders = req.headers.authorization

    if (!authHeaders || !authHeaders.startsWith('JWT ')) {
      return res.status(401).json({ message: 'Auth Token is Missing.' })
    }

    // check if it is valid or not
    const token = authHeaders.split(' ')[1]

    const valid = jwt.verify(token, process.env.SECRET_KEY)

    req.user = valid

    // decide what to do.
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Token verification failed', error: err.message })
  }
}
