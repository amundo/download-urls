---
title: download-urls.js - a utility to download all the urls in a file to a subdirectory
---

A simple Deno utility to download all URLs from a text file.

*Created by Patrick Hall*

## Overview

`download-urls.js` is a lightweight command-line tool that makes it easy to download multiple files from a list of URLs. It reads URLs from a text file (one per line) and downloads each file sequentially.

I wrote this because I could never remember the flags to `httpie` or `curl` and my `wget` is borken and ask me if I care. 🤔

## Features

- Download files from a list of URLs in a text file
- Automatically extract filenames from URLs
- Optionally save files to a specific directory
- Skip empty lines and comments (lines starting with #)
- Display progress information during download
- Simple error handling for failed downloads

## Requirements

- [Deno](https://deno.com/) runtime (1.20.0 or later)

## Installation

### Option 1: Run Directly

No installation required! Just run the script directly with Deno.

```bash
# Clone or download the repository
git clone https://github.com/yourusername/download-urls.git
cd download-urls
```

### Option 2: Install Globally


You can install the script globally to run it from anywhere on your system:

```bash
# Install globally using Deno
deno install --global --allow-net --allow-read --allow-write -n download-urls https://raw.githubusercontent.com/amundo/download-urls/main/download-urls.js


# Now you can run it from anywhere
download-urls urls.txt
```

After installation, the command will be available in your PATH as `download-urls`.

## Usage

```bash
deno run --allow-net --allow-read --allow-write download-urls.js [OPTIONS] <url-file>
```

### Arguments

- `<url-file>`: Path to a text file containing URLs to download (one per line)

### Options

- `-d, --directory <DIR>`: Directory to save downloads (default: current directory)
- `-h, --help`: Display usage information

### Permissions

The script requires the following Deno permissions:
- `--allow-net`: To download files from URLs
- `--allow-read`: To read the URL file
- `--allow-write`: To save downloaded files

## Examples

### Using the Installed Command

If you installed the command globally:

```bash
# Download to current directory
download-urls urls.txt

# Download to a specific directory
download-urls -d downloads urls.txt
```

### Basic Usage (Running Directly)

Create a file named `urls.txt` with URLs (one per line):

```
https://example.com/file1.pdf
https://example.com/file2.jpg
# This line is ignored (comment)
https://example.com/file3.zip

```

Download all files to the current directory:

```bash
deno run --allow-net --allow-read --allow-write download-urls.js urls.txt
```

### Save to a Specific Directory

Download all files to a directory named "downloads":

```bash
deno run --allow-net --allow-read --allow-write download-urls.js -d downloads urls.txt
```

## URL File Format

- One URL per line
- Empty lines are ignored
- Lines starting with `#` are treated as comments and ignored
- URL-encoded characters in filenames (like %20 for spaces) are decoded

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built with [Deno](https://deno.com/)
- Uses JSR modules for CLI parsing and file operations
