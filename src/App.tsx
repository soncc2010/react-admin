import configTheme from 'config/theme';
import routes from 'routes/index';
import './config/i18n';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

function App() {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={configTheme}>
          <AntApp>
            <RouterProvider router={createBrowserRouter(routes)} />
          </AntApp>
        </ConfigProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
