import { APP_APIS } from '@/core/apis';
import { useApiHandlers } from '@/hooks/useApiHandlers'
import { IApiResponse } from '@/types/global.types';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from 'react';
import PaymentForm from './components/PaymentForm';
import { useSearchParams } from 'react-router';
import CompletePage from '../CompletePage';

type Props = {}

const stripePromise = loadStripe('pk_test_51RRpAtP3iTBMkZcgndG8XcDbXO46C3paqGTsIkebJZBWmLlqtpi1cRn8VU2djlOhz93V6tk33oUvHIvX1Ch30EFZ00QJp9nCb9');

export default function Payment({ }: Props) {

  const [secretKey, setSecretKey] = useState<string>("")
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { create } = useApiHandlers()

  const handlePay = async (amount: string) => {
    try {
      setIsLoading(true)
      const data = {
        amount: Number(amount),
        currency: "usd"
      }
      const response = await create<IApiResponse<{ clientSecretsage: string }>>(APP_APIS.payment, data, { requiresAuth: true })
      if (response?.data && response?.status) {
        localStorage.setItem("key", response?.data?.clientSecretsage)
        setSecretKey(response?.data?.clientSecretsage)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }


  const amount = searchParams.get("amount")
  const paymentIntent = searchParams.get("payment_intent")

  // Fetch from localStorage on mount if nothing is in state
  const storedKey = localStorage.getItem("key")

  useEffect(() => {
    if (storedKey) {
      setSecretKey(storedKey)
    }
  }, [])


  useEffect(() => {
    if (amount) {
      handlePay(amount as string)
    }
  }, [amount])

  const appearance = {
    theme: 'stripe' as 'stripe',
  };

  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        secretKey && (
          <Elements options={{ clientSecret: secretKey, appearance, loader }} stripe={stripePromise}>
            {
              secretKey && paymentIntent ? <CompletePage /> : <PaymentForm isLoading={isLoading} clientSecret={secretKey} />
            }
          </Elements>
        )
      }
    </div>
  )
}