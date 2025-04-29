export default function userProfile({params}: { params: { id: string } }) {
    
    return(
        <div className="flex items-center justify-center h-screen bg-gray-100 text-black p-4">
            <div className="w-full max-w-sm p-10 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
                <p className="text-center">Welcome {params.id}</p>
            </div>
        </div>
    )
}