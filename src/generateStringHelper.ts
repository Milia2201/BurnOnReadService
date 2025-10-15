const randomstring = require("randomstring");

export default function generatRandomString() {
  const generatedStringUrl = randomstring.generate(15);
  return generatedStringUrl;
}
