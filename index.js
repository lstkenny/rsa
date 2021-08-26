import RSA from "./rsa.js"
import fs from "fs"
import readline from "readline"

const key = new RSA()
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

async function main() {
	rl.on("close", function() {
	    console.log("\nBYE BYE !!!")
	    process.exit(0)
	})
	let data, keyphrase
	while (!data) {
		keyphrase = await prompt("Keyphrase:")
		key.generateKeyPair(keyphrase)
		data = await readData()
	}
	console.log(JSON.stringify(data))
	const resource = await prompt("Resource:")
	const url = await prompt("URL:")
	const user = await prompt("Username:")
	const password = await prompt("Password:")
	const found = data.findIndex(item => item.resource === resource)
	if (found >= 0) {
		data[found].accounts.push({ user, password })
	} else {
		data.push({
			resource, url, accounts: [{
				user, password
			}]
		})
	}
	writeData(data)
	console.log(JSON.stringify(data))
}

function readData() {
	try {
		const data = fs.readFileSync("encoded.txt", "utf8")
		const decoded = key.decrypt(data)
		return JSON.parse(decoded)
	} catch (err) {
		return null
	}
}

function writeData(data) {
	try {
		const encoded = key.encrypt(JSON.stringify(data))
		fs.writeFileSync("encoded.txt", encoded)
	} catch(err) {
		console.error(err)
	}
}

async function prompt(text) {
	return new Promise((resolve, reject) => {
		rl.question(text + " ", function(value) {
			return resolve(value)
			rl.close()
		})
	})
}

main()