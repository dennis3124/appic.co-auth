// Environment and config info
module.exports = {
    db: {
        dev: {
            url: 'mongodb://admin:d312436744@ds237389.mlab.com:37389/userdb001'
        }
    },
    dbCollections: {
        user: {
            userInfo: 'UserInfo',
        }
    },
    jwt: {
        secret: 'league of legends riven'
    }
};