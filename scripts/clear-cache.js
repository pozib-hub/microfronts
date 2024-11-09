/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path')
const fs = require("fs")

const path_node_modules = path.join(__dirname, '..', 'node_modules')
const path_cache_node_modules = path.join(path_node_modules, ".cache")

fs.rmSync(path_cache_node_modules, { recursive: true })

