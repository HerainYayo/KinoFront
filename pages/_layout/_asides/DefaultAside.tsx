import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Brand from '../../../layout/Brand/Brand';
import Navigation, { NavigationLine } from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import { dashboardPagesMenu, demoPagesMenu, pageLayoutTypesPagesMenu, authPagesMenu } from '../../../menu';
import ThemeContext from '../../../context/themeContext';
import Icon from '../../../components/icon/Icon';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';
import Popovers from '../../../components/bootstrap/Popovers';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const { t } = useTranslation(['common', 'menu']);

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
				<NavigationLine />
				<Navigation menu={authPagesMenu} id='aside-demo-pages' />

			</AsideBody>

		</Aside>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default DefaultAside;
