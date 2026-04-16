import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
    try {
        const body = await request.text()
        const sig = request.headers.get('stripe-signature')
        const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)

        const handlePaymentIntent = async (paymentIntentId, isPaid) => {
            const session = await stripe.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const { orderIds, userId, appId } = session.data[0].metadata
            if (appId !== 'FashTech') {
                return NextResponse.json({ received: true, message: 'Invalid app id' })
            }

            const orderIdArray = orderIds.split(',')
            if (isPaid) {
                 // Mark order as paid
                await Promise.all(orderIdArray.map(async (orderId) => {
                    await prisma.order.update({
                        where: { id: orderId },
                        data: { isPaid: true }
                    })
                }))
                // Delete cart from user
                await prisma.user.update({
                    where: { id: userId },
                    data: { cart: {} }
                })
            } else {
                // delete order from DB
                await Promise.all(orderIdArray.map(async (orderId) => {  
                    await prisma.order.delete({
                        where: { id: orderId }
                    })
                }))
            }
        }

        switch (event.type) {
            case 'payment_intent.succeeded': {
                await handlePaymentIntent(event.data.object.id, true)
                break
            }
            case 'payment_intent.payment_failed': { 
                await handlePaymentIntent(event.data.object.id, false)
                break
            }
            default:
                console.log('Unhandled event type:', event.type)
                break;
        }
        return NextResponse.json({ received: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export const config = {
    api: { bodyParser: false } 
}