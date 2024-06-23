export type ClaimStatus =
  | 'draft'
  | 'waiting_for_payment'
  | 'waiting_for_additional_info'
  | 'waiting_for_reviewer_response'
  | 'reviewing'
  | 'waiting_for_user_response'
  | 'success'
  | 'failed';

// export type ActivityTypes = 'created' | 'reviewed' | 'status_change' | 'updated';

export interface CriticalInfo {
  addl_policy_number?: string;
  addl_already_appealed_your_denial?: boolean;
  addl_appeal_process?: string;
  addl_deniel_claim_number?: string;
  addl_associated_billing_codes?: string;
  addl_why_should_approve?: string;
  addl_relevant_docs?: string;
}

export interface ClaimDetails {
  _id: string;
  userId: string;
  first_name?: string;
  last_name?: string;
  state?: string;
  is_not_cosmetic_claim?: boolean;
  insurance_type?: string;
  insurance_provider?: string;
  date_of_claim_denial?: string;
  claim_amount?: string;
  reason_for_claim_denial?: string;
  oon_emergency_service?: string;
  oon_is_in_network_service?: string;
  oon_is_signed_consent?: string;
  consent_opt1?: boolean;
  consent_opt2?: boolean;
  consent_opt3?: boolean;
  consent_opt4?: boolean;
  criticalInfo?: CriticalInfo;
}

export interface ClaimMetadata {
  createdAt: string;
  updatedAt?: string;
  updatedBy?: string;
  status: ClaimStatus;
  estimatedCloseTime?: string;
}

export interface Comments {
  commentedBy: string;
  comment: string;
  files?: string[];
}

export interface Claim {
  _id: string;
  status: ClaimStatus;
  userId: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
  details: ClaimDetails;
  transactionId?: string;
  notifyUser?: boolean;
  // communication?: Comments[]
}

export interface StatsRingProps extends Omit<Claim, 'userId' | 'communication'> {}

export interface ClaimsListResponse {
  claims: Claim[];
  totalClaims: number;
}

// export interface NewTransactionResponse {
//   claimId: string;
//   client_secret: string;
//   transactionId: string;
//   userId: string;
// }

export interface Transaction {
  amount: number;
  claimId: string;
  createdAt: string;
  intentId: string;
  status: string;
  transactionDeatils: {
    amount: number;
    amount_capturable: string;
    amount_details: string;
    amount_received: string;
    application: string;
    application_fee_amount: string;
    automatic_payment_methods: string;
    canceled_at: string;
    cancellation_reason: string;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: string;
    currency: string;
    customer: string;
    description: string;
    id: string;
    invoice: string;
    last_payment_error: string;
    latest_charge: string;
    livemode: string;
    metadata: string;
    next_action: string;
    object: string;
    on_behalf_of: string;
    payment_method: string;
    payment_method_configuration_details: string;
    payment_method_options: string;
    payment_method_types: string;
    processing: string;
    receipt_email: string;
    review: string;
    setup_future_usage: string;
    shipping: string;
    source: string;
    statement_descriptor: string;
    statement_descriptor_suffix: string;
    status: string;
    transfer_data: string;
    transfer_group: string;
  };
  updatedAt: string;
  userId: string;
  _id: string;
}

// export interface Transaction {
//   claimId: string;
//   client_secret: string;
//   transactionId: string;
//   userId: string;
//   status: string;
//   intentId: string;
// };

export interface ClaimTransactionResponse {
  code: string;
  message?: string;
  data?: Transaction;
}

export type TransactionStatus = 'succeeded' | 'processing' | 'requires_payment_method' | string;
