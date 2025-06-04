

type Props = {}

export default function ProcessingCard({ }: Props) {
  return (
    <div className='w-full h-[70dvh] grid place-items-center'>
      <div>
        <div className=" flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-md p-6 w-[300px]  text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/media/app/payment-processing.gif" // Replace with your actual image path
                alt="Payment Success"
                className="w-28 h-28 object-contain"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Payment <span className="text-primary">Processing</span>
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Please wait while we confirm your transaction. This may take a few seconds.
            </p>

            {/* <button
              onClick={() => (window.location.href = '/')}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
            >
              BACK TO HOME
            </button> */}
          </div>
        </div>

      </div>
    </div>
  )
}