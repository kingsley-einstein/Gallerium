/* eslint-disable no-unused-vars */

/**
 *
 */
function Hasher() {};

/**
 * @param {string} token
 */
Hasher.asyncTokenAsJson = async (token) => {
  const splitToken = token.split('.');
  const header = splitToken[0];
  const payload = splitToken[1];
  const signature = splitToken[2];
  const headerCharCodeArr = [];
  const payloadCharCodeArr = [];
  const signatureCharCodeArr = [];
  for (let i = 0; i < header.length; i++) {
    const charCode = header.charCodeAt(i);
    headerCharCodeArr.push(charCode);
  }
  for (let i = 0; i < payload.length; i++) {
    const charCode = payload.charCodeAt(i);
    payloadCharCodeArr.push(charCode);
  }
  for (let i = 0; i < signature.length; i++) {
    const charCode = signature.charCodeAt(i);
    signatureCharCodeArr.push(charCode);
  }
  const obj = {
    headerCharCodeArr,
    payloadCharCodeArr,
    signatureCharCodeArr
  };
  const asJson = JSON.stringify(obj);
  return asJson;
};

/**
 * @param {string} json
 */
Hasher.asyncJsonAsToken = async (json) => {
  const obj = JSON.parse(json);
  let header = '';
  let payload = '';
  let signature = '';
  for (let i = 0; i < obj.headerCharCodeArr.length; i++) {
    header += String.fromCharCode(obj.headerCharCodeArr[i]);
  }
  for (let i = 0; i < obj.payloadCharCodeArr.length; i++) {
    payload += String.fromCharCode(obj.payloadCharCodeArr[i]);
  }
  for (let i = 0; i < obj.signatureCharCodeArr.length; i++) {
    signature += String.fromCharCode(obj.signatureCharCodeArr[i]);
  }
  return header + '.' + payload + '.' + signature;
};
