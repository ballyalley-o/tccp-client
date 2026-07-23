import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'app/store/slice/auth/auth-slice'
import bootcampsReducer from 'app/store/slice/bootcamp/bootcamp-slice'
import coursesReducer from 'app/store/slice/course/course-slice'
import feedbackReducer from 'app/store/slice/feedback/feedback-slice'

export const store = configureStore({
  reducer: {
    auth     : authReducer,
    bootcamps: bootcampsReducer,
    courses  : coursesReducer,
    feedback : feedbackReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['meta.arg', 'payload.error']
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
