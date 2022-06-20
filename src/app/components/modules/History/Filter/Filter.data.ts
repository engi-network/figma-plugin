import { TB_ACCESSORS } from '~/app/components/global/Table/Table.data'
import { STATUS } from '~/app/models/Report'

export const DURATION_RANGE = [0, 1000]

export interface TableFilterItem {
  id: TB_ACCESSORS
  value: string | number | Array<number | string> | boolean | Array<STATUS>
}

export enum FILTER_FIELDS {
  BRANCH = 'branch',
  CREATED_AFTER = 'createdAfter',
  CREATED_BEFORE = 'createdBefore',
  DURATION = 'duration',
  FAIL = 'fail',
  IN_PROGRESS = 'inProgress',
  SUCCESS = 'success',
}

export interface FilterValues {
  [FILTER_FIELDS.SUCCESS]: boolean
  [FILTER_FIELDS.FAIL]: boolean
  [FILTER_FIELDS.IN_PROGRESS]: boolean
  [FILTER_FIELDS.CREATED_AFTER]: string
  [FILTER_FIELDS.CREATED_BEFORE]: string
  [FILTER_FIELDS.DURATION]: Array<number>
  [FILTER_FIELDS.BRANCH]: Record<string, boolean>
}

export const initialFilterState: FilterValues = {
  [FILTER_FIELDS.SUCCESS]: false,
  [FILTER_FIELDS.FAIL]: false,
  [FILTER_FIELDS.IN_PROGRESS]: false,
  [FILTER_FIELDS.CREATED_AFTER]: '',
  [FILTER_FIELDS.CREATED_BEFORE]: '',
  [FILTER_FIELDS.DURATION]: DURATION_RANGE,
  [FILTER_FIELDS.BRANCH]: {},
}

export const mapFilterToAccessor = {
  [FILTER_FIELDS.DURATION]: TB_ACCESSORS.DURATION,
  status: TB_ACCESSORS.STATUS,
  period: TB_ACCESSORS.CREATED_AT,
  branch: TB_ACCESSORS.BRANCH,
}

export enum TOGGLE_NAMES {
  BRANCH = 'branch',
  COMPARE = 'compare',
  DATE_CREATED = 'dateCreated',
  DURATION = 'duration',
}

export type ToggleValues = Record<TOGGLE_NAMES, boolean>

export const toggleInitialState: ToggleValues = {
  [TOGGLE_NAMES.COMPARE]: false,
  [TOGGLE_NAMES.DATE_CREATED]: false,
  [TOGGLE_NAMES.DURATION]: false,
  [TOGGLE_NAMES.BRANCH]: false,
}
