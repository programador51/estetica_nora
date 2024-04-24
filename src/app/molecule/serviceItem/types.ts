import { ServiceOption } from "../servicesSelect/types";

export interface PropsServiceItem extends ServiceOption {
  /**
   * Callback executed when user confirms the delete of the item
   * @returns {void}
   */
  onDeleteConfirmed?: () => void;
}
