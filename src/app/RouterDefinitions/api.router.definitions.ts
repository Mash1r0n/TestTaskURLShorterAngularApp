export const ApiRouterDefinitions = {
  RetrieveAllShortUrlsAPI: 'https://localhost:7290/ShortUrl',
  AddNewShortUrlAPI: 'https://localhost:7290/ShortUrl',
  DeleteShortUrlAPI: 'https://localhost:7290/ShortUrl/code/',
  LoginUrlAPI: 'https://localhost:7290/User/login',
  RegisterUrlAPI: 'https://localhost:7290/User/register',
  RetrieveShortUrlInfoAPI: 'https://localhost:7290/ShortUrl/info?ShortUrlId=',
} as const;