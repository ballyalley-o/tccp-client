declare interface BootcampsState {
  items       : Bootcamp[]
  selected    : Bootcamp | null
  status      : AppStateStatusType
  detailStatus: AppStateStatusType
  error       : string | null
  page        : number
  limit       : number
  hasNextPage : boolean
}
