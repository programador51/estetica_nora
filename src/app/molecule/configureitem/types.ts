import { TypeAccount } from "../typeAccount/types";

export interface configureItem {
  urlPicture: string | null;
  authentication: TypeAccount;
  name: string;
  id:number;
  onUpdated?:()=>void;
  isBlocked:boolean|number;
}
