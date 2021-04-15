import axios from 'axios'
import { connect } from 'mongoose'
import connectDB from '../../../lib/middleware/db'
import InstagramToken from '../../../lib/Models/InstagramToken'

async function Endpoint(req, res) {
    try {
        const { id } = req.query

        const find = await InstagramToken.findById(id)
        const accessToken = find.access_token

        const { data: me } = await axios.get(`https://graph.instagram.com/me?access_token=${accessToken}`)
        const { data: posts } = await axios.get(`https://graph.instagram.com/${me.id}/media?access_token=${accessToken}&fields=caption,media_url,permalink,media_type,timestamp,username`)
        res.json(posts)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export default connectDB(Endpoint)
