import { useEffect, useState } from "react"


type Props = {}

export default function SuccessCard({ }: Props) {

  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [count])


  return (
    <div className='w-full h-[70dvh] grid place-items-center'>
      <div>
        <div className=" flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-md p-6 w-[300px]  text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/media/app/payment-success.svg" // Replace with your actual image path
                alt="Payment Success"
                className="w-28 h-28 object-contain"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Payment <span className="text-green-600">Successful!</span>
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Your eSIM package is ready.
            </p>

            {/* <button
              onClick={() => (window.location.href = '/')}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
            >
              BACK TO HOME
            </button> */}
            <p className="text-gray-800 font-medium text-sm">
              Redirecting to Order History in <span className="text-blue-600">{count}</span>...
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}