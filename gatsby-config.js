module.exports = {
    siteMetadata: {
        title: "Brian Fakhoury",
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "259044420",
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
    ],
};
