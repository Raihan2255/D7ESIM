import { IS_REGISTERED, REFRESH_TOKEN_KEY, TOKEN_KEY, USER_INFO } from "@/constants/global";

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
	clear(key: string) {
		if (localStorage && localStorage.getItem(key)) {
			return localStorage.removeItem(key);
		}

		if (sessionStorage && sessionStorage.getItem(key)) {
			return sessionStorage.removeItem(key);
		}

		return null;
	},

	clearAppStorage() {
		if (localStorage) {
			const onboarding = auth.get("onboarding");
			localStorage.clear();
			localStorage.setItem("onboarding", onboarding);
		}

		if (sessionStorage) {
			sessionStorage.clear();
		}
	},

	clearToken(tokenKey = TOKEN_KEY) {
		return auth.clear(tokenKey);
	},

	clearUserInfo(userInfo = USER_INFO) {
		return auth.clear(userInfo);
	},

	get(key: string) {
		if (localStorage && localStorage.getItem(key)) {
			return parse(localStorage.getItem(key) as string) || null;
		}
		if (sessionStorage && sessionStorage.getItem(key)) {
			return parse(sessionStorage.getItem(key) as string) || null;
		}
		return null;
	},

	getToken(tokenKey = TOKEN_KEY) {
		return auth.get(tokenKey);
	},

	getUserInfo(key?: any) {
		const user = auth.get(USER_INFO);
		const is_registered = auth.get(IS_REGISTERED);
		let data;

		if (key) {
			data = { ...user?.[key], is_registered };
		} else {
			data = { ...user, is_registered };
		}

		return data;
	},


	set(value: any, key: string, isLocalStorage: boolean) {
		const isEmpty = (value: any) =>
			value == null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0);

		if (isEmpty(value)) {
			return null;
		}

		if (isLocalStorage && localStorage) {
			return localStorage.setItem(key, stringify(value));
		}

		if (sessionStorage) {
			return sessionStorage.setItem(key, stringify(value));
		}

		return null;
	},

	setToken(value = "", isLocalStorage = false, tokenKey = TOKEN_KEY) {
		return auth.set(value, tokenKey, isLocalStorage);
	},
	setRefreshToken(value = "", isLocalStorage = false, tokenKey = REFRESH_TOKEN_KEY) {
		return auth.set(value, tokenKey, isLocalStorage);
	},
	setUserInfo(
		value: string = "",
		isLocalStorage = false,
		userInfo = USER_INFO
	) {
		return auth.set(value, userInfo, isLocalStorage);
	},

	logout() {
		auth.clearAppStorage();
		window.location.reload();
	},

};

export default auth;

export function generateRandomString() {
	let result = "";
	const characters =
		"wg3HFxRD3BNVkyK6RXPvBdCYdjzMSRAxrzgMRgBeYK79n985r7HSE7yeZJhmwDA8YMhERpQSANHvxpMLJs2dLt39GuYeRBgqTR2r";
	const length = 50;

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}
