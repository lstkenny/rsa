import RSA from "./rsa.js"
import fs from "fs"

const key = new RSA()
key.generateKeyPair("keyphrase")

fs.readFile("encoded.txt", "utf8" , (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	const decoded = key.decrypt(data)
	console.log(decoded)
})
// const encoded = key.encrypt(message)


fs.writeFile("encoded.txt", encoded, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})

console.log({ key, keys, message, encoded, decoded })