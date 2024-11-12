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
				<title>Privacy Policy</title>
			</Head>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center align-items-center'
						style={{ fontSize: 'calc(1rem + 1vw)' }}>
						<div>
							<h1>Privacy Policy</h1>

							<h2>1. Introduction</h2>
							<p>
								This website utilizes your Google account to access specific YouTube
								Live APIs, including retrieving live stream lists, fetching comment
								lists, and sending comments. We do not request permissions to upload
								or manage videos, nor to modify your account information.
							</p>

							<h2>2. Information We Access</h2>
							<p>
								With your explicit consent, we access the following information from
								your YouTube account:
							</p>
							<ul>
								<li>
									<strong>Live Stream Lists:</strong> To display your current and
									upcoming live streams.
								</li>
								<li>
									<strong>Comment Lists:</strong> To show comments on your live
									streams.
								</li>
								<li>
									<strong>Comment Posting:</strong> To allow you to post comments
									during live streams.
								</li>
							</ul>

							<h2>3. Scope of Access</h2>
							<p>
								We use the OAuth 2.0 scope{' '}
								<code>https://www.googleapis.com/auth/youtube</code>, which permits
								managing your YouTube account. However, we limit our access strictly
								to the functionalities mentioned above. For detailed information on
								this scope, please refer to Google's official documentation:
							</p>
							<ul>
								<li>
									<a
										href='https://developers.google.com/youtube/v3/guides/authentication'
										target='_blank'>
										YouTube Data API (v3) – Scopes
									</a>
								</li>
								<li>
									<a
										href='https://developers.google.com/identity/protocols/oauth2/scopes'
										target='_blank'>
										OAuth 2.0 Scopes for Google APIs
									</a>
								</li>
							</ul>

							<h2>4. Data Usage</h2>
							<p>
								The accessed data is used solely to provide the services described.
								We do not store, share, or use your information for any other
								purposes.
							</p>

							<h2>5. Revoking Access</h2>
							<p>
								You can revoke the permissions granted to this website at any time
								through your Google account settings:
							</p>
							<ul>
								<li>
									<a
										href='https://myaccount.google.com/permissions'
										target='_blank'>
										Google Account Permissions
									</a>
								</li>
							</ul>

							<h2>6. Contact Us</h2>
							<p>
								If you have any questions or concerns about this Privacy Policy,
								please contact us at [herainyang@gmail.com].
							</p>

							<p>
								By using this website, you agree to this Privacy Policy. We reserve
								the right to update this policy as needed.
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
