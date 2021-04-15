import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App() {
    var router = useRouter()

    const [data, setData] = useState(null)

    useEffect(() => {
        const tradeCode = async () => {
            if (!router.query.code) return

            try {
                const { data } = await axios.post('/api/ig/token', { code: router.query.code })

                setData(data)
            } catch (err) {
                console.log(err)
            }
        }
        tradeCode()
    }, [router])

    return (
        <div className="min-h-screen flex text-gray-600 bg-gray-100">
            <div className="m-auto p-6 max-w-5xl w-full space-y-8">
                <div className="space-y-4">
                    {data && (
                        <>
                            <p className="overflow-scroll text-xs border bg-gray-100 font-mono rouded p-6">{JSON.stringify(data, null, 4)}</p>
                            <p className="overflow-scroll text-xs border bg-gray-100 font-mono rouded p-6">/api/posts/{data._id}</p>

                            <p>/api/posts/{data._id}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
