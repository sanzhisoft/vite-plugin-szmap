/**
 * @Author: Blackzzc
 */

import path from "path";
import fs from "fs-extra";
import serveStatic from "serve-static";
import { HtmlTagDescriptor, normalizePath, Plugin } from "vite";

interface VitePluginSzMapOptions {
  libPath? :string;
  outPath?: string;
  useGlobal?: boolean
}

function vitePluginSzMap(
  options: VitePluginSzMapOptions = {
    outPath: "",
    libPath: "",
    useGlobal: true
  }
): Plugin {
  let szMapDist = path.join(options.libPath || "./node_modules/@sanzhisoft/szmap" ,'dist');
  let base = "/";
  let outDir = "dist";
  let isBuild = false;
  let outPath = options.outPath ||  "/libs/szmap";
  let useGlobal = options.useGlobal === undefined ? true : options.useGlobal;
  return {
    name: "vite-plugin-szmap",
    config(config, { command }) {
      isBuild = command === "build";
      base = config.base || "/";
      outDir = config.build?.outDir || "dist";
    },
    configureServer({middlewares}) {
      middlewares.use(normalizePath(path.join(base, outPath)) , serveStatic(normalizePath(szMapDist)))
    },
    closeBundle() {
      if (isBuild) {
        try {
          if (useGlobal) {
            fs.copySync(
              path.join(szMapDist, "szmap.min.js"),
              path.join(outDir, outPath, "szmap.min.js")
            );
            fs.copySync(
              path.join(szMapDist, "szmap.min.css"),
              path.join(outDir,outPath, "dc.min.css")
            );
          }
          fs.copySync(
            path.join(szMapDist, "resources"),
            path.join(outDir, outPath, "resources")
          );
        } catch (e) {}
      }
    },
    transformIndexHtml() {
      if (!useGlobal) {
        return []
      }
      let tags: HtmlTagDescriptor[] = [];
      tags.push({
        tag: "script",
        attrs: {
          src: normalizePath(
              path.join(base, outPath, "szmap.min.js")
          ),
        },
        injectTo: "head",
      });
      tags.push({
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: normalizePath(
              path.join(base, outPath, "szmap.min.css")
          ),
        },
        injectTo: "head",
      });
      return tags;
    },
  };
}

export default vitePluginSzMap;
