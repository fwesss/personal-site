import * as Sentry from "@sentry/node"
import { RewriteFrames } from "@sentry/integrations"
import { Integrations } from "@sentry/tracing"

export const init = () => {
	if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
		const integrations = []
		if (
			process.env.NEXT_IS_SERVER === "true" &&
			process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
		) {
			// For Node.js, rewrite Error.stack to use relative paths, so that source
			// maps starting with ~/_next map to files in Error.stack with path
			// app:///_next
			integrations.push(
				new RewriteFrames({
					iteratee: frame => {
						// eslint-disable-next-line no-param-reassign
						frame.filename = frame.filename.replace(
							process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
							"app:///"
						)
						// eslint-disable-next-line no-param-reassign
						frame.filename = frame.filename.replace(".next", "_next")
						return frame
					},
				})
			)
		}

		Sentry.init({
			enabled: process.env.NODE_ENV === "production",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			integrations: [...integrations, new Integrations.BrowserTracing()],
			dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
			release: process.env.NEXT_PUBLIC_COMMIT_SHA,
			tracesSampleRate: 1.0,
		})
	}
}
