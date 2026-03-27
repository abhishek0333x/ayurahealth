import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tier, email, successUrl, cancelUrl } = body

    if (!tier || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: tier, email' },
        { status: 400 }
      )
    }

    // Define pricing for each tier
    const prices: Record<string, { amount: number; name: string; interval: string }> = {
      premium: {
        amount: 499, // $4.99 in cents
        name: 'Premium Monthly',
        interval: 'month',
      },
      'premium-plus': {
        amount: 999, // $9.99 in cents
        name: 'Premium Plus Monthly',
        interval: 'month',
      },
      'premium-annual': {
        amount: 47920, // $479.20 (20% discount) in cents
        name: 'Premium Annual',
        interval: 'year',
      },
      'premium-plus-annual': {
        amount: 95920, // $959.20 (20% discount) in cents
        name: 'Premium Plus Annual',
        interval: 'year',
      },
    }

    const priceInfo = prices[tier]
    if (!priceInfo) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: priceInfo.name,
              description: `AyuraHealth ${tier.replace('-', ' ').toUpperCase()} Subscription`,
              images: ['https://d2xsxph8kpxj0f.cloudfront.net/310519663443572913/nQYKCbsnkVANj8fjMcN4AQ/ayurahealth-logo-modern-ai-ancient-Masdabix7xfaPSuHh7ULd8.webp'],
            },
            unit_amount: priceInfo.amount,
            recurring: {
              interval: priceInfo.interval as 'month' | 'year',
              interval_count: 1,
              trial_period_days: 7, // 7-day free trial
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing/cancel`,
      metadata: {
        tier,
        email,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
