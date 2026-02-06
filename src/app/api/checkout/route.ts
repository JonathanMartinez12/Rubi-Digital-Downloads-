import { NextRequest, NextResponse } from "next/server";

function getStripe() {
  const Stripe = require("stripe").default;
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2024-12-18.acacia" as any,
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment variables." },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const body = await request.json();
    const { items, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: `Digital Download - ${item.name}`,
          images: item.coverImage ? [item.coverImage] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cart`,
      customer_email: email || undefined,
      metadata: {
        productIds: items.map((i: any) => i.id).join(","),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
