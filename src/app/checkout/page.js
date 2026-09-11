import Cart from "@/components/ui/Cart";
import Modal from "@/components/ui/Modal";

export const metadata = {
    title: "Checkout | Agora",
    description: "Complete your purchase securely on Agora. Review items, enter payment details and confirm your order"
}

export default function CheckoutPage() {
    return (
        <Modal>
            <Cart />
        </Modal>
    )
}