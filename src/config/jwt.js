import * as jwtEncrypt from 'jwt-token-encrypt';
// Data that will be publicly available
let publicData = {
    role: "user"
};

// Data that will only be available to users who know encryption details.
export function privateData(data) {
    return data;
}


// Encryption settings
const encryption = {
    key: 'AAAAAAAAAAAAAA',
    algorithm: 'aes-256-cbc',
};

// JWT Settings
const jwtDetails = {
    secret: '1234567890', // to sign the token
    // Default values that will be automatically applied unless specified.
    algorithm: 'HS256',
    // expiresIn: '12h',
    // notBefore: '0s',
    // Other optional values
    key: 'ThisIsMyAppISS',// is used as ISS but can be named iss too
};
export async function token(data) {
    return await jwtEncrypt.generateJWT(
        jwtDetails,
        publicData,
        encryption,
        data
    );

}
export function decrypt(data) {
  return  jwtEncrypt.readJWT(data, encryption).data;
}
export { publicData, jwtDetails, encryption };