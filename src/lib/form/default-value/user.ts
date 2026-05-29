import type { User } from 'types'

export const USER = (user?: User) => {
    return {
      firstname: user?.firstname || '',
      lastname : user?.lastname || '',
      username : user?.username || '',
      email    : user?.email || '',
      location : user?.location || '',
      avatar   : user?.avatar || '',
    }
}