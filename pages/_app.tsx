import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Authentication } from 'components/Authentication';
import { ButtonScrollToTop } from 'components/ButtonCustomize';
import { Meta } from 'components/Meta';
import 'locales/i18n';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { store } from 'stores';
import 'styles/global.scss';
import 'styles/reset.scss';
import 'swiper/css';
import 'swiper/css/navigation';
Modal.setAppElement('#__next');
Modal.defaultStyles = {
  content: {}
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);
    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Meta />
        <Authentication>
          <Component {...pageProps} />
          <Toaster position="top-right" />
          <ButtonScrollToTop />
        </Authentication>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
