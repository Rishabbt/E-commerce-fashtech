import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";
// auht seller 
export async function GET(request) {
    try{
        const {userId} = auth(request)
        const isSeller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({ error: 'not authorized'}, {status:401})
        }
        const storeInfo = await prisma.store.findUnique({where:{userId}})

          return NextResponse.json({ isSeller, storeInfo})

    } catch{
        console.error(error)
        return NextResponse.json({error: error.code || error.message}, {status: 400})

    }
}