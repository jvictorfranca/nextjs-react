export default function ContactLayout ({children}) {

    return (
        <div className="flex flex-col bg-blue-50">

            <header className="bg-blue-200 p-4 text-center font-semibold shadow dark:bg-blue-600">
                <h2>Contact Us Section</h2>
            </header>
            <main className="flex-grow p-6 dark:bg-slate-700">
                {children}
            </main>

        </div>
    )
}