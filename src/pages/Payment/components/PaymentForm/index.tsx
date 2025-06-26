import { Button } from '@/components/ui/button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import PaymentFormSkeleton from '../PaymentFormSkeleton';
import { decrypt } from '@/utils/helper';

type Props = {
  clientSecret: string
  isLoading: boolean
}
const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL

export default function PaymentForm({ clientSecret, isLoading }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<any>();
  const [searchParams] = useSearchParams()

  // const paymentntent = searchParams.get("payment_intent")

  const encryptedAmount = searchParams.get("amount")
  const amount = encryptedAmount ? decrypt(encryptedAmount) : null
  const encryptedId = searchParams.get("package_id")
  const packageId = encryptedId ? decrypt(encryptedId) : null

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!elements || !stripe) {
      return
    }
    setIsSubmitting(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${REDIRECT_URL}payment?package_id=${packageId}`,
        // return_url: `http://localhost:5173/payment?package_id=${packageId}`
      }
    })
    setIsSubmitting(false)
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
    const paymentIntentParam = searchParams.get("payment_intent");
    if (paymentIntentParam) {
      // Use it if needed, then clean the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("payment_intent");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    console.log("paymentntent", message);
  }, [searchParams])

  return (
    <form id="payment-form" onSubmit={handleSubmit} className='max-w-1/2 w-full mx-auto'>
      {
        isLoading ? <PaymentFormSkeleton /> : (
          <>
            <PaymentElement options={paymentElementOptions} />
            <Button
              className='w-full mt-[1rem] py-[1.4rem] text-[1rem]'
              disabled={!stripe || !elements || isSubmitting}
              type='submit'
            >
              {isSubmitting ? "Processing..." : `Pay $${amount}`}
            </Button>
          </>
        )
      }
    </form>
  )
}