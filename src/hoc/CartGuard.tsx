import { FC, ReactNode, useEffect } from "react"
import { useRouter } from "next/router"

import { useCartContext } from "@/contexts/cart.context"

export const CartGuard: FC<{ children: ReactNode }> = ({ children }) => {
    const { cart } = useCartContext()
    const router = useRouter()

    useEffect(() => {
        if (cart.isReady && cart.items.length === 0) {
            router.replace('/')
        }
    }, [cart.isReady, cart.items.length, router])

    // FIXME: add a loading placeholder
    return !cart.isReady ? <div>Loading...</div> : (cart.items.length === 0 ? null : <>{children}</>)
}
