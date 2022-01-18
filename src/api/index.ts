
export type StoreReviewApiResponseData<SuccessfulData> = {
  meta: {
    code: number
    error_type?: string
    error_message?: string
  }
  data?: SuccessfulData
}

// export type StoreReviewApiResponseData<SuccessfulData> = StoreReviewApiResponseSucceededData<SuccessfulData> | StoreReviewApiResponseFailedData

// type StoreReviewApiResponseSucceededData<SuccessfulData> = {
//   meta: {
//     code: number
//   }
//   data: SuccessfulData
// }

// type StoreReviewApiResponseFailedData = {
//   meta: {
//     code: number
//     error_type: string
//     error_message: string
//   }
// }