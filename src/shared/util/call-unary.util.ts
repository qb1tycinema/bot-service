import { ServiceError } from "@grpc/grpc-js"

type GrpcUnaryMethod<Req, Res> = (
	request: Req,
	callback: (error: ServiceError | null, response: Res) => void
) => void

export function callUnary<Req, Res>(
	method: GrpcUnaryMethod<Req, Res>,
	req: Req
): Promise<Res> {
	return new Promise((resolve, reject) => {
		method(req, (error, response) => {
			if (error) {
				reject(error)
			} else {
				resolve(response)
			}
		})
	})
}
