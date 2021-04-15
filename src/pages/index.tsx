export default function App() {
    return (
        <div className="min-h-screen flex text-gray-600 bg-gray-100">
            <div className="m-auto p-6 max-w-5xl w-full space-y-8">
                <div className="space-y-4">
                    <h1 className="font-serif font-bold text-6xl">Templated</h1>
                    <h2 className="text-2xl">High-powered starter-pack for building high-powered web-apps.</h2>
                    <div>
                        <p className="font-mono">git clone https://github.com/al5ina5/templated</p>
                        <p className="font-mono">cd templated</p>
                    </div>
                </div>

                <a href={`https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=https://ig-cms.vercel.app/callback&response_type=code&scope=user_profile,user_media`}>
                    Login with Instagram
                </a>
            </div>
        </div>
    )
}
