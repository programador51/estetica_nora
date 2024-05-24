import { TypeAccount } from "@/app/molecule/typeAccount/types";

export interface OverviewCalculation {
  durationOnMinutes: number;
  total: number;
}

export interface StateUseAccessUserRoles {
  isPerformingUpdate: boolean;
}

export interface ReturnUseService extends StateUseAccessUserRoles {
  promptPromoteConfirmation: (id: number, type: TypeAccount) => Promise<void>;
}

export type ContentModalPromote = {
  [key in TypeAccount]: string;
};

export type OnUpdatedUser = (type: TypeAccount) => void;
