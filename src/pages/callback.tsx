import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App() {
    const router = useRouter()

    const [data, setData] = useState(null)

    useEffect(() => {
        const tradeCode = async () => {
            if (!router.query.email) return

            try {
                const { data } = await axios.post('/api/v1/ig/token', { email: router.query.email, code: router.query.code })

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
                                <span className="block">Start your free trial today.</span>
                            </h2>
                            <p className="mt-4 text-lg leading-6 text-indigo-200">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.</p>
                            <a href="#" className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50">
                                Sign up for free
                            </a>
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
