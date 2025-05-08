// download-urls.js - Download multiple URLs from a file

import { parseArgs } from "jsr:@std/cli/parse-args";
import { ensureDir } from "jsr:@std/fs";
import { basename, join } from "jsr:@std/path";

// Parse command-line arguments
const args = parseArgs(Deno.args, {
  string: ["directory", "d"],
  boolean: ["help", "h"],
  alias: {
    d: "directory",
    h: "help"
  },
  default: {
    directory: "." // Default to current directory
  }
});

// Show help if requested
if (args.help) {
  console.log(`
Download URLs from a file.

USAGE:
  deno run --allow-net --allow-read --allow-write download.js [OPTIONS] <url-file>

OPTIONS:
  -d, --directory <DIR>  Directory to save downloads (default: current directory)
  -h, --help             Show this help message

ARGS:
  <url-file>             File containing URLs to download (one per line)
  `);
  Deno.exit(0);
}

// Get the URL file from remaining arguments
const [urlsFile] = args._;
if (!urlsFile) {
  console.error("Error: URL file not specified");
  console.log("Run with --help for usage information");
  Deno.exit(1);
}

// Get download directory from arguments
const downloadDir = args.directory;

// Main download function
async function downloadUrls() {
  // Ensure the downloads directory exists if it's not the current directory
  if (downloadDir !== ".") {
    await ensureDir(downloadDir);
  }
  
  try {
    // Read the file content
    const content = await Deno.readTextFile(urlsFile);
    
    // Split into lines and filter out empty lines and comments
    const urls = content
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
    
    console.log(`Found ${urls.length} URLs to download`);
    
    // Process each URL
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`[${i+1}/${urls.length}] Downloading: ${url}`);
      
      try {
        // Get the filename from the URL
        const filename = decodeURIComponent(basename(url).replace(/%20/g, " "));
        const outputPath = join(downloadDir, filename);
        
        // Fetch the content
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
        }
        
        // Get the response as an ArrayBuffer
        const data = await response.arrayBuffer();
        
        // Write the file
        await Deno.writeFile(outputPath, new Uint8Array(data));
        
        console.log(`Saved to: ${outputPath}`);
      } catch (err) {
        console.error(`Error downloading ${url}: ${err.message}`);
      }
      
      // Small delay between requests to avoid overwhelming the server
      if (i < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    console.log("\nDownload complete!");
  } catch (err) {
    console.error(`Error: ${err.message}`);
    Deno.exit(1);
  }
}

// Run the main function
await downloadUrls();