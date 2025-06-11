import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";


type Props = {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
}

export default function DebouncedSearchInput({ onChange, value: initialValue, debounce = 500 }: Props) {
  const [value, setValue] = useState(initialValue);

  // Update the value state when the initialValue prop changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounce the input value and call the onChange function after the debounce time
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    // Clear the timeout when the component unmounts or the value/debounce changes
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);


  return (
    <>
      <Input
        placeholder="Search..."
        value={value} // The current value of the input
        onChange={(e) => setValue(e.target.value)} // Update the value state when the input changes
        className="ps-9 w-50"
      />
    </>
  )
}