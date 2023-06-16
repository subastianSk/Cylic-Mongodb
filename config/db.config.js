// const config = {
//     url: `mongodb+srv://${process.env.DB_USER_DEV}:${process.env.DB_PASSWORD_DEV}@${process.env.DB_HOST_DEV}/${process.env.DB_NAME_DEV}?retryWrites=true&w=majority`,
//     options: {
//         authSource: process.env.DB_SOURCE_DEV
//     }
// }

// module.exports = {
//     config
// };
const config = {
    url: `mongodb+srv://${process.env.DB_USER_DEV}:${process.env.DB_PASSWORD_DEV}@${process.env.DB_HOST_DEV}/${process.env.DB_NAME_DEV}`,
    options: {
        authSource: process.env.DB_SOURCE_DEV,
    }
}

module.exports = {
    config
};