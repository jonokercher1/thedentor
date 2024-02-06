import { useApiRequest } from '@dentor/ui'
import { ApiHookArgs } from '../api-hooks'
import getCpdCertificateRequest, { GetCpdCertificateResponse } from '@/api/course/cpd/get-cpd-certificate'
import { RequestOptions } from '@/api/api-client'

const useGetCpdCertificate = (args?: ApiHookArgs<GetCpdCertificateResponse>) => {
  const { isLoading, sendApiRequest } = useApiRequest<GetCpdCertificateResponse, { certificateId: string, requestOptions?: RequestOptions }>({
    request: getCpdCertificateRequest as any,
    onSuccess: (data) => {
      if (args?.onSuccess) {
        // TODO: improve ueApiRequest typings
        args.onSuccess(data!)
      }
    },
    onError: (e) => {
      if (args?.onError) {
        args.onError(e)
      }
    },
  })

  const getCpdCertificate = (certificateId: string) => {
    // TODO: need to work on sendApiRequest to accept a single argument, including request options for get
    sendApiRequest(certificateId as any)
  }

  return {
    getCpdCertificate,
    isGettingCpdCertificate: isLoading,
  }
}

export default useGetCpdCertificate