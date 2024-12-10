/**
 * Converts a string to a matrix of characters. First dimension is rows, second is columns.
 */
export function asMatrix<As extends typeof Number | undefined>(
  str: string,
  as?: As,
): (undefined extends As ? string[] : number[])[] {
  return str.split("\n").map((line) => {
    const arr = line.split("");

    if (as != null) {
      return arr.map(as) as (undefined extends As ? string[] : number[]);
    }

    return arr as (undefined extends As ? string[] : number[]);
  });
}
