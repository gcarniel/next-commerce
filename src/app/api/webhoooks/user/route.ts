import prisma from '@/lib/prisma'
import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Webhook, WebhookRequiredHeaders } from 'svix'

const webHookSecret = process.env.CLERK_WEBHOOK_SECRET || ''

type EventType = 'user.created' | 'user.updated' | '*'

type Event = {
  data: EventDataType
  object: 'event'
  type: EventType
}

type EventDataType = {
  id: string
  fister_name: string
  last_name: string
  email_address: EmailAddressType[]
  primary_email_address_id: string
  attributes: Record<string, string | number>
}

type EmailAddressType = {
  id: string
  email_address: string
}

async function handler(request: NextRequest) {
  const payload = await request.json()
  const headersList = headers()
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  }

  const wh = new Webhook(webHookSecret)

  let evt: Event | null = null

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as Event
  } catch (error) {
    console.error((error as Error).message)
    return NextResponse.json({}, { status: 400 })
  }

  const eventType = evt?.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const {
      id,
      fister_name,
      last_name,
      email_address,
      primary_email_address_id,
      ...attributes
    } = evt.data

    // inserir usuario no stripe
    const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
      apiVersion: '2023-10-16',
    })

    const customer = await stripe.customers.create({
      name: `${fister_name} ${last_name}`,
      email: email_address ? email_address[0].email_address : '',
    })

    await prisma.users.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        stripeCustomerId: customer.id,
        attributes,
      },
      update: {
        attributes,
      },
    })
  }

  return NextResponse.json({}, { status: 200 })
}

export const GET = handler
export const POST = handler
export const PUT = handler
