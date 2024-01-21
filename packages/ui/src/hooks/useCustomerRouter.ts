import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
import { useRouter, useSearchParams } from 'next/navigation';

export interface CustomRouterOptions {
  preserveQuery: boolean;
}

const constructUrl = (href: string, routerOptions?: CustomRouterOptions) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();

  const url = new URL(href.includes('http') ? href : window.location.host + href);
  if (routerOptions?.preserveQuery) {
    searchParams.forEach((val, key) => {
      url.searchParams.append(key, val);
    });
  }

  let urlString = url.toString();

  if (!href.includes('http')) {
    urlString = urlString.substring(urlString.indexOf('/'));
  }

  return urlString
}

export const useCustomRouter = () => {
  const router = useRouter();

  const push = (href: string, routerOptions?: CustomRouterOptions, options?: NavigateOptions) => {
    const urlString = constructUrl(href, routerOptions);

    router.push(urlString, options);
  };

  const replace = (href: string, routerOptions?: CustomRouterOptions, options?: NavigateOptions) => {
    const urlString = constructUrl(href, routerOptions);

    router.replace(urlString, options);
  };

  return { push, replace };
}