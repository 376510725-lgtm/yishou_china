#!/usr/bin/env node

import { runCli } from '../dist/server/cli.mjs';

runCli().catch((error) => {
  console.error(error?.stack || error?.message || error);
  process.exitCode = 1;
});
