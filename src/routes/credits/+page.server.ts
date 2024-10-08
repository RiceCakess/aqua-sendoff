import { CMS_REST_API_URL, PROJECT_SLUG } from '$env/static/private';
import type { PageServerLoad } from '../$types';
import qs from 'qs';
import fetchAllFromCMS from '$lib/js/fetchFromCMS';
import type { Project } from '$lib/types/CMS';
import type { CreditData, CreditGroup } from '$lib/types/types';

export const config = {
	isr: {
		expiration: false
	}
};

export const load = async function () {
	const query = qs.stringify(
		{
			where: {
				slug: {
					equals: PROJECT_SLUG
				}
			}
		},
		{ addQueryPrefix: true }
	);

	const formattedUrl = `${CMS_REST_API_URL}${CMS_REST_API_URL?.endsWith('/') ? '' : '/'}api/projects${query}`;

	const [project] = await fetchAllFromCMS<Project>(formattedUrl);

	const creditJson = JSON.parse(
		project.devprops!.find((prop) => prop.key === 'contributors')!.value
	) as CreditData;

	const groups: CreditGroup[] = creditJson.groups.map((group) => {
		return {
			groupName: group.groupName,
			data: group.data,
			disabled: group.disabled
		};
	});

	const credits: CreditData = {
		groups: groups,
		social: creditJson.social
	};

	return {
		credits
	};
} satisfies PageServerLoad;
