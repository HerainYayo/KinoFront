import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { pageLayoutTypesPagesMenu } from '../../../menu';
import Page from '../../../layout/Page/Page';
import Popovers from '../../../components/bootstrap/Popovers';

// this is the page layout for the privacy policy page
const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>Terms of Service</title>
			</Head>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center align-items-center'
						style={{ fontSize: 'calc(1rem + 1vw)' }}>
						<div>
							<h1>Terms of Service</h1>

							<h2>1. Acceptance of Terms</h2>
							<p>
								By accessing and using this website, you agree to comply with and be
								bound by the following terms and conditions. If you do not agree to
								these terms, please do not use this website.
							</p>

							<h2>2. Description of Service</h2>
							<p>
								This website provides functionalities that integrate with your
								Google account to access specific YouTube Live APIs. These
								functionalities include retrieving live stream lists, fetching
								comment lists, and sending comments. We do not request permissions
								to upload or manage videos, nor to modify your account information.
							</p>

							<h2>3. User Responsibilities</h2>
							<p>
								You are responsible for maintaining the confidentiality of your
								account credentials and for all activities that occur under your
								account. You agree to use this website in compliance with all
								applicable laws and regulations.
							</p>

							<h2>4. Privacy Policy</h2>
							<p>
								Your use of this website is also governed by our Privacy Policy,
								which outlines how we collect, use, and protect your information.
								Please review our <a href='/page-layouts/privacy'>Privacy Policy</a>{' '}
								for more details.
							</p>

							<h2>5. Limitation of Liability</h2>
							<p>
								This website is provided on an "as is" and "as available" basis. We
								make no warranties, expressed or implied, regarding the operation or
								availability of the website. We shall not be liable for any damages
								arising from the use or inability to use this website.
							</p>

							<h2>6. Modifications to Terms</h2>
							<p>
								We reserve the right to modify these Terms of Service at any time.
								Any changes will be effective immediately upon posting on this page.
								Your continued use of the website after any modifications
								constitutes your acceptance of the new terms.
							</p>

							<h2>7. Contact Information</h2>
							<p>
								If you have any questions or concerns about these Terms of Service,
								please contact us at [your contact information].
							</p>
						</div>
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
