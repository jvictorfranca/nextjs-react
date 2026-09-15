export const metadata = {
    title: "Verify email",
    description: "Verify your email to finish account creation"
}

export default function VerifyEmailPage() {
    return (
        <div className="max-w-lg mx-auto mt-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Check your email</h1>
            <p className="text-gray-600">We've sent you a verification link. Please click it to acvate your account</p>
        </div>
    )
}