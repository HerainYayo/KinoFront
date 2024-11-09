import React, { useEffect } from 'react';
import { FC } from 'react';
import { useFormik } from 'formik';
import Card, {
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardTitle,
} from '../bootstrap/Card';
import Accordion, { AccordionItem } from '../bootstrap/Accordion';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import { useRouter } from 'next/router';
import AxiosClient from '../../helpers/axiosClient';
import showNotification from '../extras/showNotification';

import { IBroadcast } from '../../common/interface';

import { useTranslation } from 'react-i18next';

interface ILiveStreamCardProps {
	broadCastInfo: IBroadcast;
}

const RoomSettingCard = ({ broadCastInfo }: ILiveStreamCardProps) => {
	const router = useRouter();
	const axiosClient = new AxiosClient(router);
	const {t} = useTranslation();
	const formik = useFormik({
		initialValues: {
            joinMessage: broadCastInfo.dbInfo.additionalInfo?.joinMessage || '',
            leaveMessage: broadCastInfo.dbInfo.additionalInfo?.leaveMessage || '',
            welcomeMessage: broadCastInfo.dbInfo.additionalInfo?.welcomeMessage || '',
            goodbyeMessage: broadCastInfo.dbInfo.additionalInfo?.goodbyeMessage || '',
		},
        enableReinitialize: true,
		onSubmit: (values) => {
			console.log('values:', values);
			axiosClient
				.post('/updateRoomAdditionalInfo', {
					additionalInfo: {
						...broadCastInfo.dbInfo.additionalInfo,
						...values,
					}
				})
				.then((res) => {
					console.log('res:', res);
					showNotification('success', 'Room Additional Info Updated');
				})
				.catch((err) => {
					console.log('err:', err);
				});
		},
	});

	return (
		<Card stretch={true}>
			<CardHeader>
				<CardTitle>{broadCastInfo?.title}</CardTitle>
			</CardHeader>
			<CardBody>
				<Card shadow={'none'} borderSize={1}>
					<CardBody>
						<img
							src={broadCastInfo?.thumbnails}
							alt='Live Stream Thumbnail'
							style={{ width: '100%' }}
						/>
						<Accordion id={'Detail'} className='mt-3' color='primary'>
							<AccordionItem
								id={'Description'}
								title={t('Description')}
								icon='DocumentScanner'>
								{broadCastInfo?.description}
							</AccordionItem>
						</Accordion>
					</CardBody>
				</Card>

				<Card shadow={'none'} borderSize={1}>
					<CardHeader>
						<CardTitle>{t('BasicSetting')}</CardTitle>
					</CardHeader>
					<CardBody>
						<form>
							<FormGroup
								label={t('JoinMessage')}
								formText={t('JoinMessageSub')}>
								<Input
									id='joinMessage'
									name='joinMessage'
									type='text'
									value={formik.values.joinMessage}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder={t('JoinMessage')}
								/>
							</FormGroup>
							<FormGroup
								label={t('LeaveMessage')}
								formText={t('LeaveMessageSub')}>
								<Input
									id='leaveMessage'
									name='leaveMessage'
									type='text'
									value={formik.values.leaveMessage}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder={t('LeaveMessage')}
								/>
							</FormGroup>
							<FormGroup
								label={t('WelcomeMessage')}
								formText={t('WelcomeMessageSub')}>
								<Input
									id='welcomeMessage'
									name='welcomeMessage'
									type='text'
									value={formik.values.welcomeMessage}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder={t('WelcomeMessage')}
								/>
							</FormGroup>
							<FormGroup
								label={t('GoodbyeMessage')}
								formText={t('GoodbyeMessageSub')}>
								<Input
									id='goodbyeMessage'
									name='goodbyeMessage'
									type='text'
									value={formik.values.goodbyeMessage}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder={t('GoodbyeMessage')}
								/>
							</FormGroup>
						</form>
					</CardBody>
				</Card>
			</CardBody>
			<CardFooter>
				<CardFooterRight>
					<button className='btn btn-primary' onClick={() => formik.handleSubmit()}>
						{
							t('Save')
						}
					</button>
				</CardFooterRight>
			</CardFooter>
		</Card>
	);
};

export default RoomSettingCard;
