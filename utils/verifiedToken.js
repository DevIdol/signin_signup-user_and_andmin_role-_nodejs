import jwt from 'jsonwebtoken'
import { handleError } from './error.js'

export const verifiedToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return next(handleError(401, 'You are not authenticated!'))

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) return next(handleError(403, 'Invalid Token!'))
    req.user = user
    next()
  })
}

export const verifyUser = (req, res, next) => {
  verifiedToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      if (error) return next(handleError(403, 'You are not authorized!'))
    }
  })
}

export const verifyAdmin = (req, res, next) => {
  verifiedToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      if (error) return next(handleError(403, 'You are not authorized!'))
    }
  })
}
