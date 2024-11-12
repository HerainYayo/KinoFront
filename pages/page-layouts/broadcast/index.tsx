import { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { use, useEffect, useRef, useState } from 'react';
import AxiosClient from '../../../helpers/axiosClient';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Head from 'next/head';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardTitle,
} from '../../../components/bootstrap/Card';

import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

import RoomSettingCard from '../../../components/customize/RooomSettingCard';

import { IBroadcast, IPlayer, IPrivateBattleUserAdditionalInfo } from '../../../common/interface';

import { useTranslation } from 'react-i18next';

import Modal, {
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import showNotification from '../../../components/extras/showNotification';

import TeamFormModal from '../../../components/customize/TeamFormModal';

const Index = () => {
	const { t } = useTranslation();
	const [broadCastId, setBroadCastId] = useState<string>('');
	const [broadCastInit, setBroadCastInit] = useState<boolean>(false);
	const router = useRouter();
	const axiosClient = new AxiosClient(router);
	const [broadCastInfo, setBroadCastInfo] = useState<IBroadcast>({
		channelId: '',
		description: '',
		title: '',
		thumbnails: '',
		liveChatId: '',
		publishedAt: '',
		broadcastId: '',
		dbInfo: {},
	});

	const [playerList, setPlayerList] = useState<IPlayer[]>([]);
	const [waitingPlayerList, setWaitingPlayerList] = useState<IPlayer[]>([]);

	const [searchTerm, setSearchTerm] = useState<string>('');

	const [playerEditOpen, setPlayerEditOpen] = useState<boolean>(false);
	const [currentSettingPlayer, setCurrentSettingPlayer] = useState<IPlayer | null>(null);
	const [currentSettingPlayerAdditionalInfo, setCurrentSettingPlayerAdditionalInfo] =
		useState<IPrivateBattleUserAdditionalInfo | null>(null);

	const [formTeamOpen, setFormTeamOpen] = useState<boolean>(false);

	//updateRoomMemberLists
	//listLiveChatMessages
	function fetchChatMessages() {
		axiosClient
			.post('/processMessages', {
				liveChatId: broadCastInfo?.liveChatId,
			})
			.then((res) => {
				let data = res.data as any;
				console.log('data:', data);

				let dataNewWaitingList = data.newWaitingList as IPlayer[];
				let dataRmvWaitingList = data.rmvWaitingList as string[];

				if (dataNewWaitingList || dataRmvWaitingList) {
					setWaitingPlayerList((prevList) => {
						let updatedList = [...prevList];

						if (dataNewWaitingList) {
							updatedList = [...updatedList, ...dataNewWaitingList];
						}

						if (dataRmvWaitingList) {
							updatedList = updatedList.filter(
								(player) => !dataRmvWaitingList.includes(player.channelId),
							);
						}

						return updatedList;
					});

					setPlayerList((prevList) => {
						let updatedList = [...prevList];

						if (dataRmvWaitingList) {
							updatedList = updatedList.filter(
								(player) => !dataRmvWaitingList.includes(player.channelId),
							);
						}

						return updatedList;
					});
				}
			})
			.catch((err) => {
				console.log('err:', err);
			});
	}

	useEffect(() => {
		if (!router.isReady) {
			return;
		}

		if (!router.query || !router.query.channelId) {
			return;
		}
		let broadCastId = router.query.channelId;

		if (broadCastId) {
			setBroadCastId(broadCastId as string);
		}

		if (broadCastInit) {
			return;
		}


		//get broadcast info and set it as current broadcast in backend
		axiosClient
			.post('/broadcasts', {
				id: broadCastId,
			})
			.then((res) => {
				console.log('room res:', res);
				let data = res.data as any;

				setBroadCastInfo({
					channelId: data.snippet.channelId,
					description: data.snippet.description,
					title: data.snippet.title,
					thumbnails: data.snippet.thumbnails.standard.url,
					liveChatId: data.snippet.liveChatId,
					publishedAt: data.snippet.publishedAt,
					broadcastId: data.id,
					dbInfo: data.dbInfo,
				});

				let waitingList = data.dbInfo.additionalInfo.waitingList;
				let playerList = data.dbInfo.additionalInfo.joinerList;

				console.log('waitingList:', waitingList);
				console.log('playerList:', playerList);

				setPlayerList(playerList);
				setWaitingPlayerList(waitingList);

				setBroadCastInit(true);
			})
			.catch((err) => {
				console.log('err:', err);
			});
	}, [router.isReady]);

	function clearHistoryData() {
		axiosClient
			.get('/resetBroadcast', {
				params: {
					broadCastId: broadCastId,
				},
			})
			.then((res) => {
				console.log('res:', res);
				showNotification('success', 'History Data Cleared');
				console.log('room res:', res);
				let data = res.data as any;

				setBroadCastInfo({
					channelId: data.snippet.channelId,
					description: data.snippet.description,
					title: data.snippet.title,
					thumbnails: data.snippet.thumbnails.standard.url,
					liveChatId: data.snippet.liveChatId,
					publishedAt: data.snippet.publishedAt,
					broadcastId: data.id,
					dbInfo: data.dbInfo,
				});

				let waitingList = data.dbInfo.additionalInfo.waitingList;
				let playerList = data.dbInfo.additionalInfo.joinerList;

				console.log('waitingList:', waitingList);
				console.log('playerList:', playerList);

				setPlayerList(playerList);
				setWaitingPlayerList(waitingList);
			})
			.catch((err) => {
				console.log('err:', err);
			});
	}

	const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		console.log('broadCastInfo.liveChatId:', broadCastInfo.liveChatId);

		if (broadCastInfo.liveChatId && broadCastInfo.liveChatId !== '') {
			if (!intervalIdRef.current) {
				axiosClient
					.post('/insertLiveChatMessage', {
						liveChatId: broadCastInfo?.liveChatId,
						message: '[きのボット] 参加リクエストの受付を開始しました！',
					})
					.then((res) => {
						console.log('res:', res);
					})
					.catch((err) => {
						console.log('err:', err);
					});

				intervalIdRef.current = setInterval(() => {
					fetchChatMessages();
				}, 10000);
				fetchChatMessages();
			}
		}

		return () => {
			if (intervalIdRef.current) {
				console.log('clear interval');
				clearInterval(intervalIdRef.current);
				intervalIdRef.current = null;
			}
		};
	}, [broadCastInfo.liveChatId]);

	function moveToPlayerList(player: IPlayer) {
		let newWaitingList = waitingPlayerList.filter((p) => {
			return p.channelId !== player.channelId;
		});

		setWaitingPlayerList(newWaitingList);
		setPlayerList([...playerList, player]);
	}

	function moveToWaitingList(player: IPlayer) {
		let newPlayerList = playerList.filter((p) => {
			return p.channelId !== player.channelId;
		});

		setPlayerList(newPlayerList);
		setWaitingPlayerList([...waitingPlayerList, player]);
	}

	function startGame() {
		// for players in playerList, add 1 to playCount

		let newPlayerList = playerList.map((player) => {
			return {
				...player,
				additionalInfo: {
					...player.additionalInfo,
					playCount: player.additionalInfo.playCount + 1,
				},
			};
		});

		setPlayerList(newPlayerList);
		console.log('newPlayerList:', newPlayerList);

		axiosClient
			.post('/startGame', {
				joinerList: newPlayerList,
				waitingList: waitingPlayerList,
			})
			.then((res) => {
				console.log('res:', res);
				showNotification('success', 'Game Started');
			})
			.catch((err) => {
				console.log('err:', err);
			});
	}

	function renderPlayerTable() {
		return (
			<table className='table table-modern '>
				<thead>
					<tr>
						<th scope='col'>{t('YoutubeName')}</th>
						<th scope='col'>{t('InGameName')}</th>
						<th scope='col'>{t('PlayCount')}</th>
						<th scope='col'>{t('XP')}</th>
						<th scope='col'>{t('Action')}</th>
					</tr>
				</thead>
				<tbody>
					{playerList.map((player: IPlayer) => {
						return (
							<tr key={player.channelId}>
								<td>{player.displayName}</td>
								<td>{player.additionalInfo.inGameName || 'None'}</td>
								<td>{player.additionalInfo.playCount || 0}</td>
								<td>{player.additionalInfo.xp || 'N/A'}</td>
								<td>
									<div>
										<Button
											icon='ArrowDownward'
											onClick={() => {
												moveToWaitingList(player);
											}}
										/>

										<Button
											icon='AddComment'
											onClick={() => {
												setPlayerEditOpen(true);
												setCurrentSettingPlayer(player);
												setCurrentSettingPlayerAdditionalInfo(
													player.additionalInfo,
												);
											}}
										/>

										<Button
											icon='Delete'
											onClick={() => {
												setPlayerList(
													playerList.filter(
														(p) => p.channelId !== player.channelId,
													),
												);
												axiosClient
													.post('/removeMember', {
														channelId: player.channelId,
													})
													.catch((err) => {
														console.log('err:', err);
													});
											}}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	const pageLimit = 8;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [renderWaitingPlayerList, setRenderWaitingPlayerList] = useState<IPlayer[]>([]);

	useEffect(() => {
		let start = (currentPage - 1) * pageLimit;
		let end = start + pageLimit;
		setRenderWaitingPlayerList(waitingPlayerList.slice(start, end));

		console.log('render waiting list:', waitingPlayerList);
	}, [waitingPlayerList, currentPage]);

	useEffect(() => {
		console.log('waitingPlayerList changed!:', waitingPlayerList);
	}, [waitingPlayerList]);

	function renderWaitingPlayerTable() {
		return (
			<table className='table table-modern '>
				<thead>
					<tr>
						<th scope='col'>{t('YoutubeName')}</th>
						<th scope='col'>{t('InGameName')}</th>
						<th scope='col'>{t('PlayCount')}</th>
						<th scope='col'>{t('XP')}</th>
						<th scope='col'>{t('Action')}</th>
					</tr>
				</thead>
				<tbody>
					{renderWaitingPlayerList.map((player: IPlayer) => {
						return (
							<tr key={player.channelId}>
								<td>{player.displayName}</td>
								<td>{player.additionalInfo.inGameName || 'None'}</td>
								<td>{player.additionalInfo.playCount || 0}</td>
								<td>{player.additionalInfo.xp || 'N/A'}</td>
								<td>
									<div>
										<Button
											icon='ArrowUpward'
											onClick={() => {
												moveToPlayerList(player);
											}}
										/>

										<Button
											icon='AddComment'
											onClick={() => {
												setPlayerEditOpen(true);
												setCurrentSettingPlayer(player);
												setCurrentSettingPlayerAdditionalInfo(
													player.additionalInfo,
												);
											}}
										/>

										<Button
											icon='Delete'
											onClick={() => {
												setWaitingPlayerList(
													waitingPlayerList.filter(
														(p) => p.channelId !== player.channelId,
													),
												);
												axiosClient
													.post('/removeMember', {
														channelId: player.channelId,
													})
													.catch((err) => {
														console.log('err:', err);
													});
											}}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	function saveAdditionalInfoForPlayer() {
		console.log('saveAdditionalInfoForPlayer');
		if (!currentSettingPlayer || !currentSettingPlayerAdditionalInfo) {
			return;
		}
		console.log('currentSettingPlayer:', currentSettingPlayer);
		console.log('currentSettingPlayerAdditionalInfo:', currentSettingPlayerAdditionalInfo);

		let newPlayerList = playerList.map((player) => {
			if (player.channelId === currentSettingPlayer.channelId) {
				return {
					...player,
					additionalInfo: currentSettingPlayerAdditionalInfo,
				};
			}
			return player;
		});

		setPlayerList(newPlayerList);

		let newWaitingList = waitingPlayerList.map((player) => {
			if (player.channelId === currentSettingPlayer.channelId) {
				return {
					...player,
					additionalInfo: currentSettingPlayerAdditionalInfo,
				};
			}
			return player;
		});

		setWaitingPlayerList(newWaitingList);

		//update to backend
		axiosClient
			.post('/updateUserAdditionalInfo', {
				channelId: currentSettingPlayer.channelId,
				additionalInfo: currentSettingPlayerAdditionalInfo,
			})
			.then((res) => {
				console.log('res:', res);
				showNotification('success', 'Player Additional Info Updated');
			})
			.catch((err) => {
				console.log('err:', err);
			});
	}

	return (
		<PageWrapper>
			<Head>
				<title>{broadCastInfo?.title}</title>
			</Head>
			<Page>
				<TeamFormModal
					playerList={playerList}
					isOpened={formTeamOpen}
					setIsOpened={setFormTeamOpen}
				/>
				<Modal isOpen={playerEditOpen} setIsOpen={setPlayerEditOpen} isCentered={true}>
					<ModalHeader>
						<ModalTitle id={'editPlayer'}>
							Edit {currentSettingPlayer?.displayName || 'No Display Name'}'s
							Additional Information
						</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<div className='container-fluid'>
							<form
								id='editPlayerForm'
								className='d-flex align-items-center'
								onSubmit={() => {
									return false;
								}}>
								<div className='col-12'>
									<div className='mb-3'>
										<label htmlFor='inGameName' className='form-label'>
											{t('InGameName')}
										</label>
										<input
											type='text'
											className='form-control'
											id='inGameName'
											placeholder='In Game Name'
											value={
												currentSettingPlayerAdditionalInfo?.inGameName ||
												'None'
											}
											onChange={(e) => {
												setCurrentSettingPlayerAdditionalInfo({
													inGameName: e.target.value,
													playCount:
														currentSettingPlayerAdditionalInfo?.playCount ||
														0,
													xp: currentSettingPlayerAdditionalInfo?.xp || 0,
												});
											}}
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='playCount' className='form-label'>
											{t('PlayCount')}
										</label>
										<input
											type='number'
											className='form-control'
											id='playCount'
											placeholder='Play Count'
											value={
												currentSettingPlayerAdditionalInfo?.playCount || 0
											}
											onChange={(e) => {
												setCurrentSettingPlayerAdditionalInfo({
													inGameName:
														currentSettingPlayerAdditionalInfo?.inGameName ||
														'',
													playCount: Number(e.target.value) || 0,
													xp: currentSettingPlayerAdditionalInfo?.xp || 0,
												});
											}}
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='xp' className='form-label'>
											XP
										</label>
										<input
											type='number'
											className='form-control'
											id='xp'
											placeholder='XP'
											value={currentSettingPlayerAdditionalInfo?.xp || 0}
											onChange={(e) => {
												setCurrentSettingPlayerAdditionalInfo({
													inGameName:
														currentSettingPlayerAdditionalInfo?.inGameName ||
														'',
													playCount:
														currentSettingPlayerAdditionalInfo?.playCount ||
														0,
													xp: e.target.value,
												});
											}}
										/>
									</div>
								</div>
							</form>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							color='primary'
							onClick={() => {
								console.log('save');
								saveAdditionalInfoForPlayer();
								setPlayerEditOpen(false);
							}}>
							Save
						</Button>
						<Button color='secondary' onClick={() => setPlayerEditOpen(false)}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
				<div className='row d-flex align-items-center h-100'>
					<div className='col-4 h-100'>
						<RoomSettingCard broadCastInfo={broadCastInfo} />
					</div>
					<div className='col-8 h-100'>
						<Card stretch={true}>
							<CardHeader>
								<CardTitle>{broadCastInfo?.title}</CardTitle>
							</CardHeader>
							<CardBody>
								<Card>
									<CardHeader>
										<CardTitle>{t('InGameName')}</CardTitle>
									</CardHeader>
									<CardBody>{renderPlayerTable()}</CardBody>
									<CardFooter>
										<CardFooterLeft>
											<Button
												color='secondary'
												onClick={() => {
													setFormTeamOpen(true);
												}}>
												{t('GroupByXP')}
											</Button>
										</CardFooterLeft>
										<CardFooterRight>
											<Button color='primary' onClick={startGame}>
												{t('StartGame')}
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>{t('WaitingMembers')}</CardTitle>
									</CardHeader>
									<CardBody>{renderWaitingPlayerTable()}</CardBody>
									<CardFooter>
										{/* <CardFooterLeft>
											<div className='container-fluid'>
												<form
													className='d-flex align-items-center'
													onSubmit={() => {
														return false;
													}}>
													<input
														type='text'
														className='form-control border-1 shadow-none bg-transparent'
														style={{ borderColor: 'black' }}
														placeholder='Search'
														value={searchTerm}
														onChange={(e) => {
															setSearchTerm(e.target.value);
														}}
													/>
													<Icon
														icon='Search'
														className='cursor-pointer ms-2'
														size={'2x'}
													/>
												</form>
											</div>
										</CardFooterLeft> */}
										<CardFooterRight>
											<Button
												color='primary'
												isLight
												isDisable={currentPage === 1}
												onClick={() => {
													setCurrentPage(currentPage - 1);
												}}>
												{t('Previous')}
											</Button>
											<Button
												color='primary'
												isLight
												isDisable={
													currentPage * pageLimit >=
													waitingPlayerList.length
												}
												onClick={() => {
													setCurrentPage(currentPage + 1);
												}}>
												{t('Next')}
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</CardBody>
							<CardFooter>
								<CardFooterLeft>
									<Button color='secondary'>
										{t('ViewStatisticalAnalysis')}
									</Button>
								</CardFooterLeft>
								<CardFooterRight>
									<Button color='primary' onClick={clearHistoryData}>
										{t('ClearHistoryData')}
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
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

export default Index;
