import { transl, type LocaleKey } from "lib/tool"
import type { User } from "types"

type FieldItemType<T> = {
    id   : number
    label: LocaleKey
    value: T
}

type FieldType = {
    ACCOUNT: (user: User) =>  FieldItemType<string>[]
}

export const FIELD: FieldType = {
  ACCOUNT: (user) => [
    {
      id   : 1,
      label: 'username',
      value: user.username
    },
    {
      id   : 2,
      label: 'location',
      value: user?.location || transl('not_set')
    },
    {
      id   : 3,
      label: 'organization',
      value: user?.organization || transl('not_set')
    }
  ]
}