import axios from 'axios'
import qs from 'qs'
import InstagramToken from '../../../lib/Models/InstagramToken'

export default async function (req, res) {
    try {
        const { code } = req.body

        const { data: shortToken } = await axios.post(
            'https://api.instagram.com/oauth/access_token',
            qs.stringify({
                code,
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'https://ig-cms.vercel.app/callback'
            })
        )

        console.log(shortToken)

        const { data: longToken } = await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${shortToken.access_token}`)

        const storeToken = new InstagramToken(longToken)
        await storeToken.save()

        res.json(storeToken)
    } catch (error) {
        res.status(500).json(error?.response?.data || 'Error.')
    }
}
