import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Toggle store isActive
export async function POST(request) {

    try {
        const { userId} = await auth()
        const isAdmin = await authAdmin(userId)

        if(!isAdmin){
            return NextResponse.json({ error: 'not authorized'}, {status:401})
        }
        const {storId} = await request.json()

        if(!storeId) {
            return NextResponse.json({ error: "Missing storeId"}, {status:400})
        }
        
        // Find the store
        const store = await prisma.store.findUnique({
            where: {id: storId}
        })    
        if(!store){
            return NextResponse.json({ error: "Store not found"}, {status:400})

        }
        await prisma.store.update({
            where: {id: storId},
            data: { isActive: !store.isActive}
        })
        return NextResponse.json({ message: "Store update successfully"})

    }
        catch(error){
            console.log(error)
         return NextResponse.json({ error: error.code || error.message}, {status:401})
        }
}