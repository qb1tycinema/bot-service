import { credentials, loadPackageDefinition } from "@grpc/grpc-js"
import { loadSync } from "@grpc/proto-loader"
import { PROTO_PATHS } from "@qb1tycinema/contracts"
import {
	AUTH_SERVICE_NAME,
	AUTH_V1_PACKAGE_NAME,
	type AuthServiceClient
} from "@qb1tycinema/contracts/gen/auth"

import { CONFIG } from "@/config"

const packageDef = loadSync(PROTO_PATHS.AUTH, {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
})

const proto = loadPackageDefinition(packageDef) as unknown as {
	[AUTH_V1_PACKAGE_NAME]: {
		[AUTH_SERVICE_NAME]: new (...args: any[]) => AuthServiceClient
	}
}

export const authClient: AuthServiceClient = new proto[AUTH_V1_PACKAGE_NAME][
	AUTH_SERVICE_NAME
](CONFIG.AUTH_GRPC_URL, credentials.createInsecure())
