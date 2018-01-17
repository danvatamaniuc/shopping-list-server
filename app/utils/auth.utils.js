import jwt from 'jsonwebtoken'
export const idToken = 'id_token'

export const jwtConfig = {
  secret: 'my-secret'
};

export function createToken(user) {
  console.log('Create token', user)
  return jwt.sign({email: user.email, _id: user._id}, jwtConfig.secret, { expiresIn: 60*60*60 /*secs*/ });
}

export function decodeToken(token) {
  return jwt.decode(token, jwtConfig.secret);
}

export async function verifyToken(token) {
  return new Promise(async(resolve)=> {
    jwt.verify(token, jwtConfig.secret, null, (err)=> {
      if (err) {
        return resolve(false)
      }
      return resolve(true)
    })
  })
}


