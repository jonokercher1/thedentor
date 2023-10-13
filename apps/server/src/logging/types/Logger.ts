export interface ILogger {
  log(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[])
  error(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[])
  warn(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[])
  debug(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[])
}