import Card, {
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	CardFooterRight,
	CardFooterLeft,
} from '../bootstrap/Card';
import { FC } from 'react';

import showNotification from '../extras/showNotification';
import Popovers from '../bootstrap/Popovers';

import { useRouter } from 'next/router';
import AxiosClient from '../../helpers/axiosClient';

import { IBroadcast } from '../../common/interface';

import { useTranslation } from 'react-i18next';

interface ILiveStreamCardProps {
	LiveStreamData: IBroadcast;
}

const LiveStreamCard: FC<ILiveStreamCardProps> = ({ LiveStreamData }) => {
	const router = useRouter();
	const axiosClient = new AxiosClient(router);

	const { t } = useTranslation();

	function joinBroadcast() {
		//pass params to /page-layouts/broadcast/index.tsx

		router.push({
			pathname: '/page-layouts/broadcast',
			query: {
				channelId: LiveStreamData.broadcastId,
			},
		});
	}

	return (
		<div className='col-lg-4'>
			<Card stretch={true}>
				<CardHeader>
					<CardTitle>{LiveStreamData.title}</CardTitle>
				</CardHeader>
				<CardBody>
					<img
						src={LiveStreamData.thumbnails}
						alt='Live Stream Thumbnail'
						style={{ width: '100%' }}
					/>

					<div className='d-flex align-items-center'>
						<div className='mt-3'>
							<p className='mb-0'>
								{t('PublishedDate') + ': ' + LiveStreamData.publishedAt}
							</p>
						</div>
					</div>
				</CardBody>
				<CardFooter>
					<CardFooterLeft>
						<Popovers
							title='Why are you seeing this?'
							desc={
								<div>
									<p className='mb-0'>Channel ID: {LiveStreamData.channelId}</p>
									<p className='mb-0'>
										Live Chat ID: {LiveStreamData.liveChatId}
									</p>
									<p className='mb-0'>
										Broadcast ID: {LiveStreamData.broadcastId}
									</p>
								</div>
							}>
							{
								t('DebugInfo')
							}
						</Popovers>
					</CardFooterLeft>
					<CardFooterRight>
						<button className='btn btn-primary' onClick={joinBroadcast}>
							Join Live Chat
						</button>
					</CardFooterRight>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LiveStreamCard;
