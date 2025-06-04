type Props = {}

export default function PaymentFormSkeleton({ }: Props) {
  return (
    <div className="mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md space-y-4 animate-pulse">
      {/* Tab Skeleton */}
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 bg-gray-300 rounded" />
        <div className="w-20 h-4 bg-gray-300 rounded" />
      </div>

      {/* Secure Checkout Skeleton */}
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-300 rounded-full" />
        <div className="w-48 h-3 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
      </div>

      {/* Card number */}
      <div>
        <div className="w-24 h-4 bg-gray-300 rounded mb-1" />
        <div className="w-full h-10 bg-gray-200 rounded" />
      </div>

      {/* Expiration and CVC */}
      <div className="flex space-x-4">
        <div className="flex-1 space-y-1">
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="w-full h-10 bg-gray-200 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="w-full h-10 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Country */}
      <div>
        <div className="w-24 h-4 bg-gray-300 rounded mb-1" />
        <div className="w-full h-10 bg-gray-200 rounded" />
      </div>

      {/* Button Skeleton */}
      <div className="w-full h-10 bg-blue-300 rounded" />
    </div>
  )
}