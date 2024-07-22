import { HttpContextToken } from "@angular/common/http";

export const SKIP_AUTH_HTTP_CONTEXT = new HttpContextToken<boolean>(() => false);