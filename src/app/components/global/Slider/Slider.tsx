import cn from 'classnames'
import ReactSlider, { ReactSliderProps } from 'react-slider'

type Props = ReactSliderProps<Array<number>>

const DEFAUTL_TRACKNAME = 'track'
export default function Slider({
  trackClassName = DEFAUTL_TRACKNAME,
  markClassName,
  min,
  max,
  onChange,
  value,
  className,
  ...rest
}: Props) {
  const renderThumb = (
    props,
    state: {
      index: number
      valueNow: number
    },
  ): JSX.Element | null => {
    const thumbClasses = cn(
      'relative flex h-3 w-3 items-center justify-center rounded-full bg-green-400',
    )
    return (
      <div {...props} className={thumbClasses}>
        <span className="-mt-10 text-xs text-primary-green">
          {state.valueNow}
        </span>
      </div>
    )
  }

  const renderTrack = (props) => {
    const trackClasses = cn(props.className, 'h-0.5 top-[5px]', {
      'bg-primary-green': props.key === `${trackClassName}-1`,
      'bg-primary-white bg-opacity-30':
        props.key === `${trackClassName}-0` ||
        props.key === `${trackClassName}-2`,
    })

    return <div {...props} className={trackClasses} />
  }

  return (
    <ReactSlider
      trackClassName={trackClassName}
      markClassName={markClassName}
      marks
      ariaLabel={['min', 'max']}
      ariaValuetext={(state: { valueNow: number }) => `${state.valueNow}`}
      renderThumb={renderThumb}
      renderTrack={renderTrack}
      pearling
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className={className}
      {...rest}
    />
  )
}
