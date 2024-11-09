export interface ILang {
	[key: string]: {
		text: string;
		lng: 'en-US' | 'de-DE' | 'fr-FR' | 'tr-TR' | 'ja-JP';
		icon: string;
	};
}

const LANG: ILang = {
	EN: {
		text: 'English',
		lng: 'en-US',
		icon: 'CustomUsa',
	},
	DE: {
		text: 'Deutsche',
		lng: 'de-DE',
		icon: 'CustomGermany',
	},
	FR: {
		text: 'Français',
		lng: 'fr-FR',
		icon: 'CustomFrance',
	},
	TR: {
		text: 'Türkçe',
		lng: 'tr-TR',
		icon: 'CustomTurkey',
	},
	JP: {
		text: '日本語',
		lng: 'ja-JP',
		icon: 'CustomJapan',
	}
};

export const getLangWithKey = (key: ILang['key']['lng']): ILang['key'] => {
	// @ts-ignore
	return LANG[Object.keys(LANG).filter((f) => LANG[f].lng === key)];
};

export default LANG;
