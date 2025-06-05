import { ImageInput, ImageInputFiles } from '@/components/image-input'
import { Button } from '@/components/ui/button'
import { SquarePen, Trash2 } from 'lucide-react'

type Props = {
  value: ImageInputFiles
  onChange: (value: ImageInputFiles, addUpdatedIndex?: number[]) => void
  multiple?: boolean
}

export default function FileInput({ onChange, value, multiple = false }: Props) {

  return (
    <ImageInput
      value={value}
      onChange={onChange}
      multiple={multiple}
      acceptType={['image/png', 'image/jpeg', 'image/webp']}
    >
      {({
        fileList,
        onImageUpload,
        onImageRemove,
        onImageUpdate,
        onImageRemoveAll,
        isDragging,
        dragProps,
      }) => (
        <div
          {...dragProps}
          className={`
          border-2 rounded-md py-6 text-center
          cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}
          transition-colors duration-200
        `}
        >
          <p className="mb-4 text-gray-700">
            {isDragging ? 'Drop images here...' : 'Drag & drop images or click the button below'}
          </p>

          <button
            type="button"
            onClick={onImageUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Select File
          </button>

          {fileList.length > 0 && (
            <>
              <button
                type="button"
                onClick={onImageRemoveAll}
                className="ml-4 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Remove All
              </button>

              <div className="mt-6 grid gap-4 px-6">
                {fileList.map((file, index) => (
                  <div key={index} className="flex items-center justify-between">
                    {file.dataURL ? (
                      <img
                        src={file.dataURL}
                        alt={`preview-${index}`}
                        className="w-10 h-10 object-cover rounded border"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded border">
                        <span className="text-gray-400 text-sm">No preview</span>
                      </div>
                    )}

                    <div className="flex items-center gap-[10px]">
                      <Button size="sm" variant="outline" type='button' onClick={() => onImageUpdate(index)}>
                        <SquarePen />
                      </Button>
                      <Button size="sm" variant="outline" type='button' onClick={() => onImageRemove(index)}>
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </ImageInput>
  )
}