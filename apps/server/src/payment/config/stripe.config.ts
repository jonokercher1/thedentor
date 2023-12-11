export const stripeConfig = {
  paymentMethodTypes: process.env.STRIPE_PAYMENT_METHODS?.split(',') ?? ['card'],
  secretKey: process.env.STRIPE_SECRET,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};