import { InjectionToken } from "@angular/core";
import { ApiVersion } from "./api-version.type";

export const API_VERSION_TOKEN = new InjectionToken<ApiVersion>('ApiVersionToken');
