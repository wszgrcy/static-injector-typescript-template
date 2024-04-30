import * as esbuild from 'esbuild';
import * as path from 'path';

export async function main() {
  let isWatch = process.argv[2];
  let options: esbuild.SameShape<esbuild.BuildOptions, esbuild.BuildOptions> = {
    platform: 'node',
    bundle: true,
    entryPoints: ['./src/index.ts'],
    outdir: path.join(process.cwd(), 'dist'),
    charset: 'utf8',
    treeShaking: true,
    minify: true,
    tsconfig: 'tsconfig.build.json',
    plugins: [],
    mainFields: ['fesm2022', 'module', 'main'],
    legalComments: 'external',
  };
  if (isWatch) {
    let ctx = await esbuild.context(options);
    ctx.watch();
  } else {
    await esbuild.build(options);
  }
}

if (require.main === module) {
  main();
}
