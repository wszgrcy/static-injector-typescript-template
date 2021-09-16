import * as path from "path";
import * as fs from "fs";
import * as ts from "typescript";
import { createTransformer } from "static-injector/transform";
export function main() {
  let inputPath = process.argv[2];
  let filePath = path.resolve(process.cwd(), inputPath);
  let tsConfigBuffer = fs.readFileSync(filePath);
  let jsonSourceFile = ts.parseJsonText(filePath, tsConfigBuffer.toString());
  let config = ts.parseJsonSourceFileConfigFileContent(jsonSourceFile, ts.sys, "");
  let program = ts.createProgram({
    rootNames: config.fileNames,
    options: config.options,
    projectReferences: config.projectReferences,
  });
  let transformer = createTransformer(program);
  program.emit(undefined, undefined, undefined, undefined, { before: [transformer] });
}

if (require.main === module) {
  main();
}
