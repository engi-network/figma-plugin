export enum ROUTES {
  HISTORY = 'history',
  HOME = 'home',
  RESULT = 'result',
}

export const ROUTES_MAP: { [routeName: string]: string } = {
  [ROUTES.HISTORY]: '/',
  [ROUTES.HOME]: '/history',
  [ROUTES.RESULT]: '/result',
}
