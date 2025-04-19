import mongoose from 'mongoose'

export const connectdb = () => {
    mongoose.connect((process.env.MONGO_URI) , {
        dbName: "ShopEasy",
    }).then(() => {
        console.log(`database is connected`)
    }).catch((error) => {
        console.log(`database ${error} occured`)
    })
}