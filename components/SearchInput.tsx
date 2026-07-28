"use client";

import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "./Input";

function SearchInput(): React.ReactElement {
  const router: AppRouterInstance = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue: string = useDebounce<string>(value, 500);

  useEffect((): void => {
    const query = {
      title: debouncedValue,
    };

    const url: string = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>): void =>
        setValue(e.target.value)
      }
    />
  );
}

export default SearchInput;
