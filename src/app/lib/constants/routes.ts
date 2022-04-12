export enum ROUTES {
  HISTORY = 'history',
  HOME = 'home',
  RESULT = 'result',
}

export const ROUTES_MAP: { [routeName: string]: string } = {
  [ROUTES.HOME]: '/',
  [ROUTES.HISTORY]: '/history',
  [ROUTES.RESULT]: '/result',
}
