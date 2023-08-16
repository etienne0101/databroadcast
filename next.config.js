module.exports = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.geojson$/,
            use: ['raw-loader'],
        });

        return config;
    },
};
