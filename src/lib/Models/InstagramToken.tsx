import mongoose, { model, Schema, connect } from 'mongoose'

const InstagramTokenSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    },
    access_token: String,
    token_type: String,
    expires_in: Number
})

mongoose.models = {}

const InstagramToken = model('InstagramToken', InstagramTokenSchema)

export default InstagramToken
