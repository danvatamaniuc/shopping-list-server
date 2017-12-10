module.exports = {
    webpack: (config, options, webpack) => {
	    config.entry.main = [
	      './app/app.js'
	    ]

	    return config
	}
};