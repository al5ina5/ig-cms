import axios from 'axios'
import moment from 'moment'
import connectDB from '../../../../../../lib/middleware/db'
import InstagramToken from '../../../../../../lib/Models/InstagramToken'

async function Endpoint(req, res) {
    try {
        const { id, afterOrBefore, cursor } = req.query

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

        const { data: posts } = await axios.get(
            `https://graph.instagram.com/${me.id}/media?access_token=${accessToken}&fields=caption,media_url,permalink,media_type,timestamp,username&limit=100&${afterOrBefore}=${cursor}`
        )

        res.json({
            data: posts.data,
            paging: {
                cursors: posts?.paging?.cursors,
                next: posts?.paging?.cursors?.after ? `http://localhost:3002/api/v1/6077f5c21f05ab000949e5af/posts/after/${posts.paging.cursors.after}` : null,
                previous: posts?.paging?.cursors?.after ? `http://localhost:3002/api/v1/6077f5c21f05ab000949e5af/posts/before/${posts.paging.cursors.after}` : null
            }
        })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}

export default connectDB(Endpoint)
