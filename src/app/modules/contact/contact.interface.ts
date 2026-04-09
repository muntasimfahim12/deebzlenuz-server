export type TContact = {
  name: string;
  email: string;
  inquiryType: "Booking" | "Collab" | "Press" | "General";
  message: string;

  isDeleted?: boolean;
};