export interface ILogger {
  log(functionName: string, message: any, ...optionalParams: any[])
  log(functionName: string, message: any, description?: string, ...optionalParams: any[])

  error(functionName: string, message: any, ...optionalParams: any[])
  error(functionName: string, message: any, description?: string, ...optionalParams: any[])

  warn(functionName: string, message: any, ...optionalParams: any[])
  warn(functionName: string, message: any, description?: string, ...optionalParams: any[])

  debug(functionName: string, message: any, ...optionalParams: any[])
  debug(functionName: string, message: any, description?: string, ...optionalParams: any[])
}