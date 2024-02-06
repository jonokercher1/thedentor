import createUserCpdCertificate, { CreateUserCpdCertificateArgs, CreateUserCpdCertificateResponse } from '@/api/course/cpd/create-user-cpd-certificate'
import { useApiRequest } from '@dentor/ui'
import { ApiHookArgs } from '../api-hooks'

const useCreateCpdCertificate = (args?: ApiHookArgs<CreateUserCpdCertificateResponse>) => {
  const { isLoading, sendApiRequest } = useApiRequest<CreateUserCpdCertificateResponse, CreateUserCpdCertificateArgs>({
    request: createUserCpdCertificate,
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

  const createCpdCertificate = (courseId: string) => {
    sendApiRequest({ courseId })
  }

  return {
    createCpdCertificate,
    isCreatingCpdCertificate: isLoading,
  }
}

export default useCreateCpdCertificate