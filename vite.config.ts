import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import copy from 'rollup-plugin-copy';

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = env.PORT || 9090;

  return {
    base: '/',
    mode: env.NODE_ENV,
    server: {
      host: '0.0.0.0',
      port: port as number,
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
    build: {
      target: 'es2015',
      outDir: 'public',
      emptyOutDir: true,
      manifest: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          entryFileNames: 'app.[hash].js',
          chunkFileNames: 'app.[hash].chunk.js',
          assetFileNames: 'assets.[hash].[ext]',
        },
      },
    },
    define: {
      API_URL: JSON.stringify(env.API_URL),
      PORT: JSON.stringify(env.PORT),
    },
    resolve: {
      alias: {
        layouts: path.resolve(__dirname, 'src/layouts'),
        config: path.resolve(__dirname, 'src/config'),
        constants: path.resolve(__dirname, 'src/constants'),
        components: path.resolve(__dirname, 'src/components'),
        apis: path.resolve(__dirname, 'src/apis'),
        types: path.resolve(__dirname, 'src/types'),
        styles: path.resolve(__dirname, 'src/styles'),
        pages: path.resolve(__dirname, 'src/pages'),
        locales: path.resolve(__dirname, '/src/locales'),
        utils: path.resolve(__dirname, 'src/utils'),
        assets: path.resolve(__dirname, 'assets'),
        src: path.resolve(__dirname, 'src'),
        modals: path.resolve(__dirname, 'src/modals'),
        enums: path.resolve(__dirname, 'src/enums'),
        stores: path.resolve(__dirname, 'src/stores'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        routes: path.resolve(__dirname, 'src/routes'),
        HOC: path.resolve(__dirname, 'src/HOC'),
        providers: path.resolve(__dirname, 'src/providers'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    plugins: [
      react(),
      eslintPlugin(),
      copy({
        verbose: true,
        hook: 'writeBundle',
        targets: [
          {
            src: 'assets/fonts',
            dest: 'public/assets',
          },
          {
            src: 'assets/images',
            dest: 'public/assets',
          },
        ],
      }),
      AutoImport({
        eslintrc: {
          enabled: true,
        },
        imports: [
          'react',
          {
            react: [
              'cloneElement',
              'createContext',
              'StrictMode',
              'Suspense',
              'lazy',
            ],
          },
          {
            antd: [
              'ConfigProvider',
              'notification',
              ['App', 'AntApp'],
              ['Layout', 'AntLayout'],
              ['Collapse', 'AntCollapse'],
              ['Alert', 'AntAlert'],
              ['Breadcrumb', 'AntBreadcrumb'],
              ['Table', 'AntTable'],
              ['Pagination', 'AntPagination'],
              ['Button', 'AntButton'],
              ['Checkbox', 'AntCheckbox'],
              ['DatePicker', 'AntDatePicker'],
              ['Menu', 'AntMenu'],
              ['Row', 'AntRow'],
              ['Col', 'AntCol'],
              ['Image', 'AntImage'],
              ['Avatar', 'AntAvatar'],
              ['Space', 'AntSpace'],
              ['Dropdown', 'AntDropdown'],
              ['Form', 'AntForm'],
              ['Input', 'AntInput'],
              ['Select', 'AntSelect'],
              ['Checkbox', 'AntCheckbox'],
              ['Button', 'AntButton'],
              ['Typography', 'AntTypography'],
              ['Space', 'AntSpace'],
              ['Flex', 'AntFlex'],
              ['Spin', 'AntSpin'],
              ['Table', 'AntTable'],
              ['Modal', 'AntModal'],
              ['Card', 'AntCard'],
              ['Upload', 'AntUpload'],
              ['InputNumber', 'AntInputNumber'],
              ['Tag', 'AntTag'],
              ['Skeleton', 'AntSkeleton'],
              ['Descriptions', 'AntDescriptions'],
            ],
          },
          {
            'react-router-dom': [
              'createBrowserRouter',
              'RouterProvider',
              'Link',
              'useNavigate',
              'NavLink',
              'useParams',
              'Outlet',
              'useLocation',
              'useSearchParams',
              'useBeforeUnload',
              'useMatch',
              'Navigate',
              'matchRoutes',
              'useOutletContext',
            ],
          },
          {
            '@phosphor-icons/react': [
              ['Package', 'PackageIcon'],
              ['Eye', 'EyeIcon'],
              ['ChartLineUp', 'ChartLineUpIcon'],
              ['Key', 'KeyIcon'],
              ['Gear', 'GearIcon'],
              ['User', 'UserIcon'],
              ['LockKey', 'LockKeyIcon'],
              ['Envelope', 'EnvelopeIcon'],
              ['SquaresFour', 'SquaresFourIcon'],
              ['Users', 'UsersIcon'],
              ['ShoppingCart', 'ShoppingCartIcon'],
              ['IdentificationBadge', 'IdentificationBadgeIcon'],
              ['Power', 'PowerIcon'],
              ['MagnifyingGlass', 'MagnifyingGlassIcon'],
              ['Plus', 'PlusIcon'],
              ['Pencil', 'PencilIcon'],
              ['Trash', 'TrashIcon'],
              ['WarningCircle', 'WarningCircleIcon'],
              ['FloppyDisk', 'FloppyDiskIcon'],
              ['X', 'XIcon'],
              ['Export', 'ExportIcon'],
              ['ArrowUp', 'ArrowUpIcon'],
              ['ArrowDown', 'ArrowDownIcon'],
              ['Money', 'MoneyIcon'],
              ['Basket', 'BasketIcon'],
            ],
          },
          {
            'react-i18next': [
              'useTranslation',
              'initReactI18next',
              'Trans',
              'Translation',
            ],
          },
          {
            '@tanstack/react-query': [
              'useMutation',
              'useQueries',
              'useQuery',
              'useQueryClient',
              'QueryClient',
              'QueryClientProvider',
              'useInfiniteQuery',
            ],
          },
          {
            i18next: [
              ['changeLanguage', 'updateLocale'],
              ['default', 'i18nInstance'],
              ['use', 'useI18n'],
            ],
          },
          {
            'lodash-es': [
              'get',
              'map',
              'size',
              'filter',
              'includes',
              'lowerCase',
              'uniqueId',
              'isArray',
              'head',
              'isEmpty',
              'sumBy',
              'find',
              'flatMap',
            ],
          },
          {
            'react-helmet-async': ['HelmetProvider', 'Helmet'],
          },
          {
            'react-hook-form': [
              'Controller',
              'useForm',
              'useController',
              'useWatch',
              'useFieldArray',
              'FormProvider',
              'useFormContext',
            ],
          },
          {
            zustand: ['create'],
          },
          {
            '@hookform/resolvers/zod': ['zodResolver'],
          },
          {
            zod: ['z'],
          },
          {
            from: 'zustand',
            imports: ['StateCreator'],
            type: true,
          },
          {
            from: 'antd',
            imports: [
              'MenuProps',
              'ThemeConfig',
              'FormProps',
              'BreadcrumbItemType',
              'TableProps',
              'TablePaginationConfig',
              'UploadFile',
              'UploadProps',
              'SelectProps',
              'UseFormRegister',
              'DescriptionsProps',
              'GetProp',
            ],
            type: true,
          },
          {
            from: 'react-router-dom',
            imports: ['RouteObject'],
            type: true,
          },
          {
            from: 'react',
            imports: [
              'FC',
              'ReactNode',
              'ComponentType',
              'ReactElement',
              'ChangeEvent',
            ],
            type: true,
          },
          {
            from: 'react-hook-form',
            imports: [
              'FieldErrors',
              'Control',
              'RegisterOptions',
              'UseFormGetValues',
              'UseFormReturn',
              'FieldValues',
              'FieldArrayWithId',
              'UseFormSetValue',
              'UseFormSetError',
              'UseFormHandleSubmit',
            ],
            type: true,
          },
          {
            from: '@tanstack/react-query',
            imports: ['UseMutationResult'],
            type: true,
          },
          {
            from: 'react-hook-form',
            imports: ['Path'],
            type: true,
          },
        ],
        dirs: ['src/shared'],
        dts: 'src/types/auto-imports.d.ts',
      }),
    ],
  };
});
