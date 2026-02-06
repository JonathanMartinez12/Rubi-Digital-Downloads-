import { NextRequest, NextResponse } from "next/server";

function getStripe() {
  const Stripe = require("stripe").default;
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2024-12-18.acacia" as any,
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Stripe webhook is not configured" },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature" },
        { status: 400 }
      );
    }

    let event: any;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        console.log("Payment successful:", {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          amountTotal: session.amount_total,
          productIds: session.metadata?.productIds,
        });

        // TODO: Update order in Firestore
        // TODO: Generate download links from Firebase Storage
        // TODO: Send confirmation email via Resend

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("Payment failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
