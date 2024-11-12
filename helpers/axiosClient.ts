import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NextRouter } from 'next/router';
import showNotification from '../components/extras/showNotification';

class AxiosClient {
	private axiosInstanceJson: AxiosInstance;
	private router: NextRouter;
	private axiosInstanceForm: AxiosInstance;

	private loginPath = '/auth-pages/login';
	private mainPath = '/';

	constructor(router: NextRouter) {
		this.router = router;
		this.axiosInstanceJson = axios.create({
			headers: {
				'Content-Type': 'application/json',
				// 'Access-Control-Allow-Origin': 'http://localhost:3000',
			},
			withCredentials: true,
		});

		this.axiosInstanceForm = axios.create({
			headers: {
				'Content-Type': 'multipart/form-data',
				// 'Access-Control-Allow-Origin': 'http://localhost:3000',
			},
			withCredentials: true,
		});
	}

	//set headers and change it back after the request

	public async post<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<T>> {
		try {
			url = process.env.NEXT_PUBLIC_GATEWAY_URL + url;
			const response = await this.axiosInstanceJson.post<T>(url, data, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
			if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		try {
			url = process.env.NEXT_PUBLIC_GATEWAY_URL + url;
			const response = await this.axiosInstanceJson.get<T>(url, config);
			return response;
		} catch (error: any) {
			console.log('error:', error);
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	public async put<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<T>> {
		try {
			url = process.env.NEXT_PUBLIC_GATEWAY_URL + url;
			console.log('url:', url);
			const response = await this.axiosInstanceJson.put<T>(url, data, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		try {
			url = process.env.NEXT_PUBLIC_GATEWAY_URL + url;
			const response = await this.axiosInstanceJson.delete<T>(url, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	//put form
	public async putForm<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<T>> {
		try {
			url = process.env.NEXT_PUBLIC_GATEWAY_URL + url;
			const response = await this.axiosInstanceForm.put<T>(url, data, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	public async login<T>(username: string, password: string) {
		try {
			let url = 'https://mxj36lu352.execute-api.ap-southeast-2.amazonaws.com/login';
			const data = {
				username,
				password,
			};
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await this.axiosInstanceJson.post<T>(url, data, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	/*
  					action: "sign_up",
					email: formik.values.email,
					password: formik.values.signupPassword,
					userName: formik.values.userName,
					surname: formik.values.surname,
					role: formik.values.role,
  */
	public async register<T>(
		email: string,
		password: string,
		userName: string,
		surname: string,
		role: string,
	) {
		try {
			let url = 'https://mxj36lu352.execute-api.ap-southeast-2.amazonaws.com/auth';
			const data = {
				action: 'sign_up',
				email,
				password,
				userName,
				surname,
				role,
			};
			console.log('data:', data);
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await this.axiosInstanceJson.post<T>(url, data, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	public async confirmSignUp<T>(email: string, code: string) {
		try {
			let url = 'https://mxj36lu352.execute-api.ap-southeast-2.amazonaws.com/auth';
			const data = {
				action: 'confirm_sign_up',
				email,
				confirmationCode: code,
			};
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await this.axiosInstanceJson.post<T>(url, data, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}

	public async resendConfirmationCode<T>(email: string) {
		try {
			let url = 'https://mxj36lu352.execute-api.ap-southeast-2.amazonaws.com/auth';
			const data = {
				action: 'resend_confirmation_code',
				email,
			};
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await this.axiosInstanceJson.post<T>(url, data, config);
			return response;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				this.router.push(this.loginPath);
			}
      if (error.response && error.response.status === 404) {
				this.router.push(this.mainPath);
			}
			throw error;
		}
	}
}

export default AxiosClient;
