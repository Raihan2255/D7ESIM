import { Button } from '@/components/ui/button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

type Props = {
  clientSecret: string
}

export default function PaymentForm({ clientSecret }: Props) {

  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<any>();
  const [searchParams] = useSearchParams()

  const paymentntent = searchParams.get("payment_intent")

  const amount = searchParams.get("amount")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!elements || !stripe) {
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5175/payment"
      }
    })
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
  }

  const paymentElementOptions = {
    layout: "accordion" as const
  }

  useEffect(() => {
    console.log("paymentntent", paymentntent);
  }, [searchParams])

  return (
    <form id="payment-form" onSubmit={handleSubmit} className='max-w-1/2 w-full mx-auto'>
      <PaymentElement options={paymentElementOptions} />
      <Button className='w-full mt-[1rem] py-[1.4rem] text-[1rem]' disabled={!stripe || !elements} type='submit'>Pay ${amount}</Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}