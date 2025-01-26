import React from 'react'

function ImageGallery({carDetail}) {
  return (
    <div>

        <div>
            <img src={carDetail?.images[0].imageUrl}
            className='w-full h-[500px] object-cover rounded-xl' />
        </div>
    </div>
  )
}

export default ImageGallery