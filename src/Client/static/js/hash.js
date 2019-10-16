/* eslint-disable no-unused-vars */
/**
 *
 * @param {string} token
 * @param {string} _signing_entity
 * @return {string} useful in hashing
 */
function hash(token, _signing_entity) {
  let signer = '';
  for (let i = 0; i < _signing_entity.length; i++) {
    signer += _signing_entity.charCodeAt(Math.floor(i));
  }
  const new_signer = signer.replace('1', '$').replace('2', '%');
  const hash = Buffer.from(JSON.stringify({
    hash: (token.replace('.', '$') + '=' + new_signer)
  }));
  return hash.toString('base64');
}

/**
 *
 * @param {string} encrypted
 * @return {string} unhashed string
 */
function unhash(encrypted) {
  const reversed = Buffer.from(encrypted, 'base64').toString('utf8');
  const unhashed = JSON.parse(reversed);
  const splits = unhashed.hash.split('=');
  const actual_token = splits[0].replace('$', '.');
  return actual_token;
}
