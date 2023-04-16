import { Link, Modal, TextContainer } from "@shopify/polaris";
import { memo } from "react";
import { BookingGetAll } from "../../../api/model";

export type BookingCustomerProps = { booking: BookingGetAll };

export const BookingCustomer = memo(({ booking }: BookingCustomerProps) => {
  const url =
    import.meta.env.VITE_SHOP_URL + `/admin/customers/${booking.customerId}`;

  return (
    <>
      <Modal.Section>
        <TextContainer>
          <strong>Fuldenavn:</strong>{" "}
          <Link url={url} external>
            {booking.customer.firstName} {booking.customer.lastName}
          </Link>
        </TextContainer>
      </Modal.Section>
      <Modal.Section>
        <TextContainer>
          <strong>email:</strong> {booking.customer.email || "-"}
        </TextContainer>
      </Modal.Section>
      <Modal.Section>
        <TextContainer>
          <strong>mobil:</strong> {booking.customer.phone || "-"}
        </TextContainer>
      </Modal.Section>
    </>
  );
});
