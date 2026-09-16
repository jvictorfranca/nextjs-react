import Link from "next/link"

export const metadata = {
    title: "Email Verified",
    description: "Email has been successfully validated."
}

export default function VerifyEmailSuccess() {
    return (
        <div className="max-w-lg mx-auto mt-20 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">
                Email Verified
            </h1>
            <p className="text-gray-600 mb-6">
                Your account is now actie. You can log in below
            </p>

            <Link className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" href="/login">
                Go to Login
            </Link>

        </div>
    )
}