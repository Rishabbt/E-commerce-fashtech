


import prisma from "@/lib/prisma"
import authSeller from "@/middlewares/authSeller"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Get the dashboard data for seller ( total orders, total earning, total products )
export async function GET(request){
    try{
            const { userId} = auth(request)
            const storeId = await authSeller(userId)

            // Get all orders for seller
            const orders = await prisma.product.findMany({where: {storeId}})

            // Get all products with rating for seller

            const products = await prisma.product.findMany({where: {storeId}})

            const ratings = await prisma.ratings.findMany({where:{productId: {in: products.map(product => product.id)}},
            include: {user: true, product: true}
        })

        const dashboardData = {
            ratings,
            totalOrders: orders.length,
            totalEarning: Math.round(orders.reduce((acc, order) => acc + order.total, 0)),
            totalProducts: products.length
        }

        return NextResponse.json({dashboardData})
    } catch(error){
       console.error(error)
       return NextResponse.json({error: error.code || error.message}, {status:400})
    }
}