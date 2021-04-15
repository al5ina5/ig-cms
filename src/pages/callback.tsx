import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App() {
    const router = useRouter()

    const [data, setData] = useState(null)

    useEffect(() => {
        const tradeCode = async () => {
            if (!router.query.code) return
            if (!router.query.state) return

            try {
                const { data } = await axios.post('/api/v1/ig/token', { email: router.query.state, code: router.query.code })

                setData(data)
            } catch (err) {
                console.log(err)
            }
        }
        tradeCode()
    }, [router])

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                <span className="block">Your CMS is ready.</span>
                            </h2>
                            <div>
                                <p className="mt-4 leading-6 text-indigo-200 bg-white bg-opacity-10 text-xs font-mono inline-block px-1 rounded">
                                    <a href={`https://ig-cms.vercel.app/api/v1/${data?._id}/posts`}>
                                        GET https://ig-cms.vercel.app/api/v1/
                                        {data?._id}
                                        /posts
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20 bg-white w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
