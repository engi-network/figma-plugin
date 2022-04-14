export enum ROUTES {
  HISTORY = 'history',
  HOME = 'home',
  LOADING = 'loading',
  RESULT = 'result',
}

export const ROUTES_MAP: { [routeName: string]: string } = {
  [ROUTES.HOME]: '/',
  [ROUTES.HISTORY]: '/history',
  [ROUTES.RESULT]: '/result',
  [ROUTES.LOADING]: '/loading',
}
