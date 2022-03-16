import { Slider } from '@lifarl/react-scroll-snap-slider'

function Swiper() {
  return (
    <Slider
      slidesPerPageSettings={{
        mobileSmall: 3,
        mobileBig: 3,
        tablet: 3,
        desktop: 3,
      }}
    >
      {Array(50)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            css={{ border: '1px solid gray' }}
            className="border-dotted border-2 border-indigo-600"
          >
            Slide {index}
          </div>
        ))}
    </Slider>
  )
}

export default Swiper
