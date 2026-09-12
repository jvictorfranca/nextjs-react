import { getDatabaseContents } from "./actions";


export const metadata = {
    title: "Database Viewer",
    description: "View all database tables"
};

export default async function DatabaseViewerPage() {
    let data = {}

    try{
        data = await getDatabaseContents()
    } catch (e) {
        return <p className="p-6 text-center text-red-600">Error: {e.message}</p>
    }
    return (
    <div className="p-6 space-y-10 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Database tables</h1>
        {
            Object.keys(data).length == 0 ? (
                <p className="text-gray-600 text-center">No tables found</p>
            ) : (
                Object.entries(data).map(([tableName, rows]) => (
                    <div key={tableName} className="border rounded-lg shadow-sm bg-white dark:bg-slate-800">
                        <h2 className="text-xl font-semibold p-3 bg-gray-100 dark:bg-slate-700 rounded-t-lg">{tableName} ({rows.length})</h2>
                        {
                            rows.length === 0 ? (
                                <p className="p-4 text-gray-500">No rows in this table</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm border-collapse">
                                        <thead>
                                        <tr className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100">
                                            {
                                                Object.keys(rows[0]).map((col) => (
                                                    <th key={col} className="border px-3 py-2 text-left">{col}</th>
                                                ))
                                            }
                                        </tr> 
                                        </thead>
                                        <tbody>
                                            {
                                                rows.map((row, i) => (
                                                    <tr key={i} className="border-t">
                                                        {
                                                            Object.keys(row).map((col) => (
                                                                <td key={col} className="border px-3 py-2">
                                                                    {String(row[col]) ?? ""}
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                ))
            
            )
        }
    </div>
    )
}
