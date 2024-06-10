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

export interface AdditionalInfo {
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
  additionalInfo?: AdditionalInfo;
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
  // communication?: Comments[]
}

export interface StatsRingProps extends Omit<Claim, 'userId' | 'communication'> {}

export interface ClaimsListResponse {
  claims: Claim[];
  totalClaims: number;
}

export interface NewTransactionResponse {
  claimId: string;
  client_secret: string;
  transactionId: string;
  userId: string;
}

export interface NewTransactionResponse {
  claimId: string;
  client_secret: string;
  paymentId: string;
  userId: string;
};

export type TransactionStatus = 'succeeded' | 'processing' | 'requires_payment_method' | string;