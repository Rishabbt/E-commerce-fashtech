// BUG FIX 1: prisma import was missing entirely — caused ReferenceError on every call
import prisma from "@/lib/prisma"

const authSeller = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { store: true },
        })

        if (user?.store) {
            if (user.store.status === 'approved') {
                return user.store.id
            }
            // BUG FIX 2: was falling through with implicit `undefined` return
            // when store exists but is not approved — now explicitly returns false
            return false
        }

        return false

    } catch (error) {
        console.log(error)
        return false
    }
}

export default authSeller