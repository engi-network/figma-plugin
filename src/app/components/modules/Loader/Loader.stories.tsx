import Loader from './Loader'

export default { component: Loader, title: 'Modules/Loader' }

export function LoaderWithAnimation() {
  return (
    <div className="w-64 h-64">
      <Loader />
    </div>
  )
}
