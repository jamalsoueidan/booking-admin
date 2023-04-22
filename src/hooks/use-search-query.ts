import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type Queries = Record<string, string>;

function compareSelectedKeys(
  obj1: Queries,
  obj2: Queries,
  keys: string[]
): boolean {
  // Iterate through the keys to compare
  for (const key of keys) {
    // If both objects have the key, compare their values
    if (key in obj1 && key in obj2) {
      if (obj1[key] !== obj2[key]) {
        // If the values are not equal, return false
        return false;
      }
    } else {
      // If either object does not have the key, return false
      return false;
    }
  }

  // If all values are equal for the given keys, return true
  return true;
}

export const useSearchQuery = () => {
  const [search, setSearch] = useSearchParams();

  const query = useMemo(() => Object.fromEntries(search), [search]);

  const updateQuery = useCallback(
    (props: Queries) => {
      if (!compareSelectedKeys(props, query, Object.keys(props))) {
        setSearch({ ...query, ...props });
      }
    },
    [query, setSearch]
  );

  const getQuery = useCallback(
    (key: string) => {
      return search.get(key);
    },
    [search]
  );

  const resetQuery = useCallback(() => {
    setSearch({});
  }, [setSearch]);

  return { query, setQuery: setSearch, updateQuery, resetQuery, getQuery };
};
