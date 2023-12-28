#!/usr/local/cs/bin/python3

"""
Implementing the GNU shuf command in Python 3 style.
"""

import argparse
import random
import sys

def shuf(input_file, echo, input_range, head_count, repeat):
    if input_file == '/dev/null':
        raise ValueError("Error: Cannot read from /dev/null.")
    if input_range:
        min_val, max_val = map(int, input_range.split('-'))
        input_list = list(map(str, range(min_val, max_val + 1)))
    elif input_file == '-':
        input_list = sys.stdin.readlines()
    else:
        with open(input_file, 'r') as file:
            input_list = file.readlines()

    if repeat and not head_count:
        while True:
            random.shuffle(input_list)
            for line in input_list:
                sys.stdout.write(line)
            sys.stdout.flush()
    else:
        random.shuffle(input_list)
        output_lines = input_list[:head_count]
        for line in output_lines:
            sys.stdout.write(line)
            sys.stdout.flush()

    if echo:
        for line in input_list:
            sys.stdout.write(line)
            sys.stdout.flush()

def main():
    parser = argparse.ArgumentParser(description="Implementing the GNU shuf command in Python 3 style.")
    parser.add_argument("--echo", "-e", action="store_true", help="echo input lines to output")
    parser.add_argument("--input-range", "-i", help="treat each number LO through HI as an input line")
    parser.add_argument("--head-count", "-n", type=int, help="output at most COUNT lines")
    parser.add_argument("--repeat", "-r", action="store_true", help="output lines can be repeated")
    parser.add_argument("input_file", nargs="?", default="-", help="input file name (default: stdin)")

    args = parser.parse_args()

    if args.head_count is not None and args.head_count < 0:
        parser.error("negative --head-count")

    if args.input_range and '-' not in args.input_range:
        parser.error("invalid range format: {0}".format(args.input_range))

    if not args.head_count and not args.repeat:
        args.head_count = 1

    shuf(args.input_file, args.echo, args.input_range, args.head_count, args.repeat)

if __name__ == "__main__":
    main()
