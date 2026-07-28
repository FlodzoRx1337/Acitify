"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

import useSubscribeModal, {
  SubscribeModalStore,
} from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import { Price, ProductWithPrice } from "@/types";

import { Stripe } from "@stripe/stripe-js";
import Button from "./Button";
import Modal from "./Modal";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice: (price: Price) => string = (price: Price): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
};

function SubscribeModal({ products }: SubscribeModalProps): React.ReactElement {
  const subscribeModal: SubscribeModalStore = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange: (open: boolean) => void = (open: boolean): void => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const handleCheckout: (price: Price) => Promise<void> = async (
    price: Price
  ): Promise<void> => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      toast.error("Must be logged in");
      return;
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      toast("Already subscribed");
      return;
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe: Stripe | null = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error((error as Error)?.message);
      return;
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content: React.ReactElement = (
    <div className="text-center">No products available.</div>
  );

  if (products.length) {
    content = (
      <div>
        {products.map(
          (
            product: ProductWithPrice
          ): React.ReactElement | React.ReactElement[] => {
            if (!product.prices?.length) {
              return <div key={product.id}>No prices available</div>;
            }

            return product.prices.map(
              (price: Price): React.ReactElement => (
                <Button
                  key={price.id}
                  onClick={(): Promise<void> => handleCheckout(price)}
                  disabled={isLoading || price.id === priceIdLoading}
                  className="mb-4"
                >
                  {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                </Button>
              )
            );
          }
        )}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed.</div>;
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
}

export default SubscribeModal;
