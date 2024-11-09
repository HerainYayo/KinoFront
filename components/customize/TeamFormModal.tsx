import { IPlayer } from '../../common/interface';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ITeamFormModalProps {
	playerList: IPlayer[];
	isOpened: boolean;
	setIsOpened: (isOpened: boolean) => void;
}

const TeamFormModal = ({ playerList, isOpened, setIsOpened }: ITeamFormModalProps) => {
	useEffect(() => {
		//split the players into 2 teams
		splitTeams();
	}, [playerList]);
	const [team1, setTeam1] = useState<IPlayer[]>([]);
	const [team2, setTeam2] = useState<IPlayer[]>([]);

    const [team1AvgXp, setTeam1AvgXp] = useState<number>(0);
    const [team2AvgXp, setTeam2AvgXp] = useState<number>(0);

    const { t } = useTranslation();

	function splitTeams() {

        let totalXp = 0;
		playerList.forEach((player) => {
			totalXp += Number(player.additionalInfo.xp || 1800);
		});

		let newTeam1: IPlayer[] = [];
		let newTeam2: IPlayer[] = [];

        let numOfTeam1 = Math.floor(playerList.length / 2);
        console.log('numOfTeam1:', numOfTeam1);
        let numOfTeam2 = playerList.length - numOfTeam1;

        let team1Xp = 0;
        let team2Xp = 0;

        //sort playerList by xp
        playerList.sort((a, b) => Number(b.additionalInfo.xp || 1800) - Number(a.additionalInfo.xp || 1800));

        for(let i = 0; i < playerList.length; i++) {
            let gotoTeam1 = team1Xp <= team2Xp;

            if(newTeam2.length >= numOfTeam2) {
                gotoTeam1 = true;
            }
            if(newTeam1.length >= numOfTeam1) {
                gotoTeam1 = false;
            }

            

            if(gotoTeam1) {
                newTeam1.push(playerList[i]);
                team1Xp += Number(playerList[i].additionalInfo.xp || 1800);
            } else {
                newTeam2.push(playerList[i]);
                team2Xp += Number(playerList[i].additionalInfo.xp || 1800);
            }
            
        }

        setTeam1(newTeam1);
        setTeam2(newTeam2);

        setTeam1AvgXp(team1Xp / numOfTeam1);
        setTeam2AvgXp(team2Xp / numOfTeam2);
        
	}

	return (
		<Modal isOpen={isOpened} setIsOpen={setIsOpened} isCentered={true}>
			<ModalHeader>
				<ModalTitle id='teamForm'>{t('TeamFormation')}</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<div className='row'>
					<div className='col-lg-6'>
						<h3>{t('Team1') + '[' + team1AvgXp + ']'}</h3>
						<ul>
							{team1.map((player, index) => (
								<li key={index}>{player.displayName + '[' + (player.additionalInfo.xp || 1800) + ']'}</li>
							))}
						</ul>
					</div>
					<div className='col-lg-6'>
						<h3> {t('Team2') + '[' + team2AvgXp + ']'}</h3>
						<ul>
							{team2.map((player, index) => (
								<li key={index}>{player.displayName + '[' + (player.additionalInfo.xp || 1800) + ']'}</li>
							))}
						</ul>
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<button className='btn btn-secondary' onClick={() => setIsOpened(false)}>
					OK
				</button>
			</ModalFooter>
		</Modal>
	);
};

export default TeamFormModal;
