import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: process.env.APP_AUTH0_AUDIENCE,
  issuerBaseURL: process.env.APP_AUTH0_DOMAIN,
  tokenSigningAlg: process.env.APP_TOKEN_SIGNING_ALG,
});

export default jwtCheck;
