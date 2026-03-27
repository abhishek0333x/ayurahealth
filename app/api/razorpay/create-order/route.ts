import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tier, email, amount, currency = 'INR' } = body

    if (!tier || !email || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: tier, email, amount' },
        { status: 400 }
      )
    }

    // Define pricing for each tier in INR (Indian Rupees)
    const prices: Record<string, { amount: number; name: string }> = {
      premium: {
        amount: 399, // ₹399/month
        name: 'Premium Monthly',
      },
      'premium-plus': {
        amount: 799, // ₹799/month
        name: 'Premium Plus Monthly',
      },
      'premium-annual': {
        amount: 3192, // ₹3,192/year (20% discount)
        name: 'Premium Annual',
      },
      'premium-plus-annual': {
        amount: 6392, // ₹6,392/year (20% discount)
        name: 'Premium Plus Annual',
      },
    }

    const priceInfo = prices[tier]
    if (!priceInfo) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: priceInfo.amount * 100, // Convert to paise
      currency: currency,
      receipt: `order_${Date.now()}`,
      notes: {
        tier,
        email,
        product: 'AyuraHealth Subscription',
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Razorpay error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// Verify Razorpay payment signature
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      )
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const generated_signature = hmac.digest('hex')

    if (generated_signature === razorpay_signature) {
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
      })
    } else {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}
