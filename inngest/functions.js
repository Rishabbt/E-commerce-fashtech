import { inngest } from './client'
import prisma from '@/lib/prisma';
// Inngest fn  to save user data to a database

export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk',
        triggers: [{ event: 'clerk/user.created' }]
    },
    async ({ event }) => {
        const { data } = event
        await prisma.user.create({
            data: {

                _id: data.id,
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image_url: data.image_url

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
        const { data } = event
        await prisma.user.update({
            where: { id: data.id },
            data: {


                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image_url: data.image_url

            }
        })

    }
)

export const syncUserDeletion = inngest.createFunction(
    {
        id: 'sync-user-delete',
        triggers: [{ event: 'clerk/user.delete' }]
    },
    async ({ event }) => {
        const { data } = event
        await prisma.user.delete({
            where: { id: data.id },
            data: {
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image_url: data.image_url

            }
        })

    }
)