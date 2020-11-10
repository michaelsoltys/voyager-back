const config = {
    frontend: {
        url: (process.env.FRONT_END_ADDRESS ? "http://" + process.env.FRONT_END_ADDRESS + ":3000" : 'http://localhost:3000')
    },
    db: {
        host : process.env.DB_HOST || 'localhost',
        user : process.env.DB_USER || 'voyager_api2',
        password : process.env.DB_PASS ||'voyager',
        database : process.env.DB_NAME || 'voyager'
    }
};

module.exports = config;