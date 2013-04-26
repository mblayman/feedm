'''A utility to compress CSS, HTML, and JS files.'''

from argparse import ArgumentParser
import gzip
import os

extensions = [
    'css',
    'html',
    'js'
]

def should_compress(filename):
    '''Check if a file should be compressed.'''
    for extension in extensions:
        if filename.endswith(extension):
            return True

    return False

def compress(directory):
    '''Compress all the files types from the extension list in the provided
    directory. This will destroy the uncompressed version so be careful.'''

    for dirpath, _, filenames in os.walk(directory):
        for filename in filenames:
            if should_compress(filename):
                file_path = os.path.join(dirpath, filename)
                compress_file(file_path)

def compress_file(file_path):
    '''Compress the file at the provided path.'''
    print(file_path)
    compressed_path = file_path + '.gz'

    with open(file_path, 'rb') as uncompressed:
        try:
            compressed = gzip.open(compressed_path, 'wb')
            compressed.writelines(uncompressed)
        except Exception as ex:
            print('Gzip compression failed: %s' % ex)
        finally:
            compressed.close()

    # Now overwrite the original.
    os.rename(compressed_path, file_path)

if __name__ == '__main__':
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('directory')
    args = parser.parse_args()
    compress(args.directory)

