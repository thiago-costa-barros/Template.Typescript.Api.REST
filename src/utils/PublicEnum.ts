type EnumValueType = {
  name: string | null;
  value: number;
};

class PublicEnum {
  constructor(readonly details: EnumValueType) {}

  get name(): string | null {
    return this.details.name;
  }

  get value(): number {
    return this.details.value;
  }
}

export class ExternalWebhookReceiverSourceType {
  static readonly WebhookTest = new PublicEnum({
    name: "webhooktest/any_platform",
    value: 0,
  });
  static readonly Hotmart = new PublicEnum({
    name: "Jodd HTTP",
    value: 1,
  });
  static readonly Default = new PublicEnum({
    name: null,
    value: 2,
  });

  private constructor() {}

  static fromName(name: string | null): PublicEnum {
    const found = Object.values(this).find((e) => e.name === name);
    return found || this.Default;
  }
}

export class ExternalWebhookReceiverStatus {
  static readonly Created = 0;
  static readonly AwaitingProcessing = 1;
  static readonly Processed = 2;
  static readonly Error = 99;

  private constructor() {}
}

export class ExternalWebhookReceiverEventType {
  static readonly PURCHASE_CANCELED = new PublicEnum({
    name: "PURCHASE_CANCELED",
    value: 0,
  });

  static readonly PURCHASE_COMPLETE = new PublicEnum({
    name: "PURCHASE_COMPLETE",
    value: 1,
  });

  static readonly PURCHASE_BILLET_PRINTED = new PublicEnum({
    name: "PURCHASE_BILLET_PRINTED",
    value: 2,
  });

  static readonly PURCHASE_APPROVED = new PublicEnum({
    name: "PURCHASE_APPROVED",
    value: 3,
  });

  static readonly PURCHASE_PROTEST = new PublicEnum({
    name: "PURCHASE_PROTEST",
    value: 4,
  });

  static readonly PURCHASE_REFUNDED = new PublicEnum({
    name: "PURCHASE_REFUNDED",
    value: 5,
  });

  static readonly PURCHASE_CHARGEBACK = new PublicEnum({
    name: "PURCHASE_CHARGEBACK",
    value: 6,
  });

  static readonly PURCHASE_EXPIRED = new PublicEnum({
    name: "PURCHASE_EXPIRED",
    value: 7,
  });

  static readonly PURCHASE_DELAYED = new PublicEnum({
    name: "PURCHASE_DELAYED",
    value: 8,
  });

  static readonly PURCHASE_OUT_OF_SHOPPING_CART = new PublicEnum({
    name: "PURCHASE_OUT_OF_SHOPPING_CART",
    value: 9,
  });

  static readonly SWITCH_PLAN = new PublicEnum({
    name: "SWITCH_PLAN",
    value: 10,
  });

  static readonly SUBSCRIPTION_CANCELLATION = new PublicEnum({
    name: "SUBSCRIPTION_CANCELLATION",
    value: 11,
  });

  static readonly UPDATE_SUBSCRIPTION_CHARGE_DATE = new PublicEnum({
    name: "UPDATE_SUBSCRIPTION_CHARGE_DATE",
    value: 12,
  });

  static readonly CLUB_FIRST_ACCESS = new PublicEnum({
    name: "CLUB_FIRST_ACCESS",
    value: 13,
  });

  static readonly CLUB_MODULE_COMPLETED = new PublicEnum({
    name: "CLUB_MODULE_COMPLETED",
    value: 14,
  });

  static readonly ERROR = new PublicEnum({
    name: null,
    value: 99,
  });

  private constructor() {}

  static fromName(name: string | null): PublicEnum {
    const found = Object.values(this).find((e) => e.name === name);
    return found || this.ERROR;
  }
}

export class UserTokenStatus {
  static readonly Active = 0;
  static readonly Inactive = 1;
  static readonly Blocked = 2;
  static readonly Expired = 3;
  static readonly Error = 4;

  private constructor() {}
}

export class UserTokenType {
  static readonly AccessToken = 0;
  static readonly RefreshToken = 1;

  private constructor() {}
}

export class ErrorType {
  static readonly ValidationError = new PublicEnum({ name: "ValidationError", value: 400 });
  static readonly Unauthorized = new PublicEnum({ name: "Unauthorized", value: 401 });
  static readonly Forbidden = new PublicEnum({ name: "Forbidden", value: 403 });
  static readonly NotFound = new PublicEnum({ name: "NotFound", value: 404 });
  static readonly MethodNotAllowed = new PublicEnum({ name: "MethodNotAllowed", value: 405 });
  static readonly Conflict = new PublicEnum({ name: "Conflict", value: 409 });
  static readonly UnprocessableEntity = new PublicEnum({ name: "UnprocessableEntity", value: 422 });
  static readonly InternalServerError = new PublicEnum({ name: "InternalServerError", value: 500 });
  static readonly ServiceUnavailable = new PublicEnum({ name: "ServiceUnavailable", value: 503 });
  
  private constructor() {}
}