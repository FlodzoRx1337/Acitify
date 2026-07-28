import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ProductWithPrice } from "@/types";

async function getActiveProductsWithPrices(): Promise<ProductWithPrice[]> {
  const supabase: SupabaseClient<any, "public", any> =
    createServerComponentClient({
      cookies: cookies,
    });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }

  return (data as ProductWithPrice[]) || [];
}

export default getActiveProductsWithPrices;
