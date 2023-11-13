const cardBrands = ['VISA', 'MasterCard'] as const;
type CardBrand = (typeof cardBrands)[number];

export interface PaymentProfile {
  PaymentProfileId: number;
  PaymentMediaId: number;
  Brand: CardBrand | string;
  CardOwner: string;
  Bin: string;
  IssuerBank: unknown;
  Type: string;
  Token: string;
  Expiration: string;
  Last4: string;
  Enabled: boolean;
}

interface CustomerReadOnlyData {
  readonly CustomerId: number;
  readonly Created: unknown;
  readonly Owner: string;
  readonly PaymentProfiles?: PaymentProfile[];
  readonly UniqueID: string;
  CommerceCustomerId?: string;
  CaptureURL?: string;
  AdditionalData?: Object;
  Plans?: unknown;
}

export interface CreateCustomerDTO {
  FirstName?: string;
  LastName?: string;
  DocumentTypeId?: number;
  DocNumber?: string;
  Email: string;
  PhoneNumber?: string;
  BillingAddress?: unknown;
  ShippingAddress?: unknown;
  Enabled?: boolean;
}

export interface Customer extends CustomerReadOnlyData, CreateCustomerDTO {}
