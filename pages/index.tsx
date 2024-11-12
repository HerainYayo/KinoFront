import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../layout/SubHeader/SubHeader';
import Page from '../layout/Page/Page';
import Popovers from '../components/bootstrap/Popovers';

import LiveStreamCard from '../components/customize/LiveStreamCard';

import AxiosClient from '../helpers/axiosClient';

import { useRouter } from 'next/router';

import { IBroadcast } from '../common/interface';

const Index: NextPage = () => {
	const [broadCastList, setBroadCastList] = React.useState<IBroadcast[]>([]);

	const router = useRouter();
	const axiosClient = new AxiosClient(router);

	useEffect(() => {
		async function fetchData() {
			try {
				const axiosResponse = await axiosClient.get('/api/listLiveBroadcasts');

				let data = axiosResponse.data as any;

				if ((data.items as []).length > 0) {
					let tempList: IBroadcast[] = [];
					(data.items as []).forEach((item: any) => {
						tempList.push({
							channelId: item.snippet.channelId,
							description: item.snippet.description,
							title: item.snippet.title,
							thumbnails: item.snippet.thumbnails.standard.url,
							liveChatId: item.snippet.liveChatId,
							publishedAt: item.snippet.publishedAt,
							broadcastId: item.id,
						});
					});
					setBroadCastList(tempList);
				}
			} catch (err) {
				console.log('Error');
				console.log(err);
			}
		}

		fetchData();
	}, []);

	useEffect(() => {
		console.log('broadCastList', broadCastList);
	}, [broadCastList]);

	function renderLiveStreamCard() {
		if (broadCastList.length > 0) {
			return broadCastList.map((item: IBroadcast, index: number) => {
				return <LiveStreamCard key={index} LiveStreamData={item} />;
			});
		} else {
			return <div>No Live Stream Available</div>;
		}
	}

	return (
		<PageWrapper>
			<Head>
				<title>Dashboard</title>
			</Head>

			<Page>
				<div className='row'>
					<div className='col-12 mb-3'>
						<div className='row'>{renderLiveStreamCard()}</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});
export function sum(num1: number, num2: number): number {
	return num1 + num2;
}
export default Index;
