import React, { FC, useCallback, useContext, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useDarkMode from '../../../hooks/useDarkMode';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Logo from '../../../components/Logo';
import Button from '../../../components/bootstrap/Button';

import { useTranslation } from 'react-i18next';

import channels4_profile from '../../../assets/img/wanna/channels4_profile.png';

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: NextPage<ILoginProps> = () => {
	const router = useRouter();

	const { darkModeStatus } = useDarkMode();

	console.log('url path',process.env.NEXT_PUBLIC_GATEWAY_URL)

	const handleOnClick = useCallback(async () => {
		console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
		// router.push('/');

		window.location.href = process.env.NEXT_PUBLIC_GATEWAY_URL + '/loginToGoogle';

		// oauthSignIn();
	}, [router]);

	const { t } = useTranslation();

	const LoginHeader = () => {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>{t('Login')}</div>
				<div className='text-center h4 text-muted mb-5'>{t('LoginToContinue')}</div>
			</>
		);
	};

	return (
		<PageWrapper isProtected={false} className={classNames({ 'bg-dark': true })}>
			<Head>
				<title>Login</title>
			</Head>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<div>
										<img
											src={channels4_profile}
											alt='channels4_profile'
											width={100}
										/>
									</div>
									<div className='text-center h4 text-muted mb-5'>
										{t('KinoStreamManager')}
									</div>
								</div>

								<LoginHeader />

								<form className='row g-4'>
									<>
										<div className='col-12'>
											<Button
												isOutline
												color={darkModeStatus ? 'light' : 'dark'}
												className={classNames('w-100 py-3', {
													'border-light': !darkModeStatus,
													'border-dark': darkModeStatus,
												})}
												icon='CustomGoogle'
												onClick={handleOnClick}>
												{t('LoginWithGoogle')}
											</Button>
										</div>
									</>
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<Link
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-dark': true,
								})}>
								Privacy policy
							</Link>
							<Link
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-dark': true,
								})}>
								Terms of use
							</Link>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Login;
