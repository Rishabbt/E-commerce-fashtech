import { inngest } from './client'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

function getPrisma() {
    const connectionString = process.env.DATABASE_URL
    const adapter = new PrismaNeon({ connectionString })
    return new PrismaClient({ adapter })
}

export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk',
        triggers: [{ event: 'clerk/user.created' }]
    },
    async ({ event }) => {
        const prisma = getPrisma()
        const { data } = event
        await prisma.user.create({
            data: {
                id: data.id,
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url
            }
        })
    }
)

export const syncUserUpdation = inngest.createFunction(
    {
        id: 'sync-user-update',
        triggers: [{ event: 'clerk/user.updated' }]
    },
    async ({ event }) => {
        const prisma = getPrisma()
        const { data } = event
        await prisma.user.update({
            where: { id: data.id },
            data: {
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url
            }
        })
    }
)

export const syncUserDeletion = inngest.createFunction(
    {
        id: 'sync-user-delete',
        triggers: [{ event: 'clerk/user.deleted' }]
    },
    async ({ event }) => {
        const prisma = getPrisma()
        const { data } = event
        await prisma.user.delete({
            where: { id: data.id }
        })
    }
)