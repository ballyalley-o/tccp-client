import type { User, UserRole } from 'types'

export const loginUserDefaultValue = {
    email   : '',
    password: '',
}
export const registerUserDefaultValue =  (role: UserRole) => {
   return {
        firstname   : '',
        lastname    : '',
        username    : '',
        email       : '',
        password    : '',
        role,
        organization: '',
   }
}

export const updateUserDefaultValue = (user?: User) => {
    return {
        firstname: user?.firstname || '',
        lastname : user?.lastname || '',
        username : user?.username || '',
        email    : user?.email || '',
        location : user?.location || '',
        avatar   : user?.avatar || '',
    }
}
