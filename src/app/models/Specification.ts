import { Message } from './Message'

export type Specification = Pick<
  Message,
  'story' | 'component' | 'repository' | 'branch' | 'commit'
>
