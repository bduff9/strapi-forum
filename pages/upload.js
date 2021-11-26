import { getSession } from 'next-auth/client';
import React from "react";

import Uploadforum from "./Components/Uploadforum";

function Upload() {
	return (
		<div>
			<Uploadforum />
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(302, { Location: '/' });
		context.res.end();
		return {};
	}
	return {
		props: {
			user: session.user,
		}
	}
}

export default Upload;
