import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// get store info & store products
export async function GET(request) {
    try{ 
        // Get store username form query params
        const {searchParams}  = new URL(request.url)
        const username = searchParams.get('username').toLocaleLowerCase()

        if(!username){
                    return NextResponse.json({ message: 'Missing username' }, {status:400})
            
        }

        // Get store info and inStock products with rating

        const store = await prisma.store.findUnique({
            where: {username, isActive: true},
            include: {Product: {include: {rating: true}}}
        })

        if(!store){
                     return NextResponse.json({ message: 'Store not found' },{ status: 400})
             
        } 
        return  NextResponse.json({ store },{ status: 200})
             
    } catch(error) {
         console.error(error)
                return NextResponse.json({error: error.code || error.message}, {status: 400})
        
    }
}