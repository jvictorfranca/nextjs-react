export default async function Cart() {
    const items = [
        {id: 1, name: "React course", price: 49},
        {id: 2, name: "Next essentials", price: 99},
    ]

    const total = items.reduce((sum, item) => sum + item.price, 0)
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4"> Your card</h2>
            <ul className="space-y-2">
                {
                    items.map(item => (
                        <li key={item.id}> {item.name} - ${item.price}</li>
                ))}
            </ul>
            <hr className="my-4"/>
            <p className="font-bold text-lg text-right">Total: ${total}</p>
        </div>
    )
}