import { TB_ACCESSORS } from '~/app/pages/History/History.data'

export const DURATION_RANGE = [0, 1000]

export interface TableFilterItem {
  id: TB_ACCESSORS
  value: string | number | Array<number | string> | boolean
}

export enum FILTER_FIELDS {
  CREATED_AFTER = 'createdAfter',
  CREATED_BEFORE = 'createdBefore',
  DURATION = 'duration',
  FAIL = 'fail',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
}

export interface FilterValues {
  [FILTER_FIELDS.SUCCESS]: boolean
  [FILTER_FIELDS.FAIL]: boolean
  [FILTER_FIELDS.IN_PROGRESS]: boolean
  [FILTER_FIELDS.CREATED_AFTER]: string
  [FILTER_FIELDS.CREATED_BEFORE]: string
  [FILTER_FIELDS.DURATION]: Array<number>
}

export const initialFilterState: FilterValues = {
  [FILTER_FIELDS.SUCCESS]: false,
  [FILTER_FIELDS.FAIL]: false,
  [FILTER_FIELDS.IN_PROGRESS]: false,
  [FILTER_FIELDS.CREATED_AFTER]: '',
  [FILTER_FIELDS.CREATED_BEFORE]: '',
  [FILTER_FIELDS.DURATION]: DURATION_RANGE,
}

export const mapFilterToAccessor = {
  [FILTER_FIELDS.DURATION]: TB_ACCESSORS.DURATION,
  status: TB_ACCESSORS.STATUS,
  period: TB_ACCESSORS.CREATED_AT,
}

export enum TOGGLE_NAMES {
  COMPARE = 'compare',
  DATE_CREATED = 'dateCreated',
  DURATION = 'duration',
}

export type ToggleValues = Record<TOGGLE_NAMES, boolean>

export const toggleInitialState: ToggleValues = {
  [TOGGLE_NAMES.COMPARE]: false,
  [TOGGLE_NAMES.DATE_CREATED]: false,
  [TOGGLE_NAMES.DURATION]: false,
}
