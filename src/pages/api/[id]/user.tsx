import axios from 'axios'
import { connect } from 'mongoose'
import moment from 'moment'
import connectDB from '../../../lib/middleware/db'
import InstagramToken from '../../../lib/Models/InstagramToken'

async function Endpoint(req, res) {
    try {
        const { id } = req.query

        let find = await InstagramToken.findById(id)
        const accessToken = find.access_token

        const dayDiff = moment(Date.now()).diff(find.date_created, 'days')
        const expired = dayDiff > 58

        if (expired) {
            const { data: refreshAccessToken } = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`)

            find = await InstagramToken.findOneAndUpdate({ _id: id }, refreshAccessToken)
        } else {
            console.log('not-expired')
        }

        const { data: me } = await axios.get(`https://graph.instagram.com/me?access_token=${accessToken}`)

        const { data: posts } = await axios.get(`https://graph.instagram.com/${me.id}/media?access_token=${accessToken}&fields=caption,media_url,permalink,media_type,timestamp,username`)
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}

export default connectDB(Endpoint)
