import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  const BASE_URL = 'https://unpkg.com';
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      // handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // handle relative paths in module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(
            args.path,
            BASE_URL + args.resolveDir + '/'
          ).href,
        };
      });

      // handle main file of module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `${BASE_URL}/${args.path}`
        }
      });
    },
  };
};