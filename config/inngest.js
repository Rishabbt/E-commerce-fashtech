// src/inngest/client.ts
import { Inngest } from "inngest";
import connenctDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "FashTech" });

// Inngest function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk',
        triggers: [{ event: 'clerk/user.created' }]  // ✅ moved here
    },
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image_url: image_url
        }
        await connenctDB()
        await User.create(userData)
    }
)

// Inngest fn to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk',
        triggers: [{ event: 'clerk/user.updated' }]  // ✅ moved here
    },
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image_url: image_url
        }
        await connenctDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

// Inngest fn to delete from DB
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk',
        triggers: [{ event: 'clerk/user.deleted' }]  // ✅ moved here
    },
    async ({event}) => {
        const {id} = event.data
        await connenctDB()
        await User.findByIdAndDelete(id)
    }
)