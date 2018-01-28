(async () => {
	const res = await axios.get('https://api.github.com/repos/zerolty/CssControl/commits/ea38dd322b5a5ebab4f92f82cfd3b464fb8ffb15',{
		headers: {
			// "Accept": "application/vnd.github.diff"
		}
	})
	const patchs = res.data.files.map(c => c.patch)
	console.log(patchs[0])
	console.log(patchs.length)
})()