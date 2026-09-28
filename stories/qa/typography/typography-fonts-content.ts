export interface LanguagePangram {
	lang: string;
	language: string;
	code: string;
	lowercase: string;
}

export interface CharacterSet {
	label: string;
	text: string;
}

export const languagePangrams: LanguagePangram[] = [
	{
		lang: 'fr',
		language: 'French',
		code: 'FR',
		lowercase: "Le cœur déçu mais l'âme plutôt naïve, Louÿs rêva de crapaüter en canoë au delà des îles, près du mälström où brûlent les novæ.",
	},
	{
		lang: 'en',
		language: 'English',
		code: 'EN',
		lowercase: 'The quick brown fox jumps over the lazy dog.',
	},
	{
		lang: 'de',
		language: 'German',
		code: 'DE',
		lowercase: 'Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.',
	},
	{
		lang: 'es',
		language: 'Spanish',
		code: 'ES',
		lowercase: 'El veloz murciélago hindú comía feliz cardillo y kiwi mientras una cigüeña cantaba más su canción.',
	},
	{
		lang: 'it',
		language: 'Italian',
		code: 'IT',
		lowercase: 'Ma la volpe, col suo balzo, ha raggiunto il quieto Fido perché è più svelta lì in città, però ormai non lo sa più.',
	},
	{
		lang: 'nl',
		language: 'Dutch',
		code: 'NL',
		lowercase: "Pa's wijze lynx bezag vroom het fikse aquaduct terwijl hij poëzie las over een ruïne bij het café, dankzij goede coördinatie.",
	},
	{
		lang: 'pt',
		language: 'Portuguese',
		code: 'PT',
		lowercase: 'Luís argüia à Júlia que «brações, fé, chá, óxido, pôr, zângão» eram palavras do português.',
	},
	{
		lang: 'pl',
		language: 'Polish',
		code: 'PL',
		lowercase: 'Pchnąć w tę łódź jeża lub ośm skrzyń fig.',
	},
	{
		lang: 'ca',
		language: 'Catalan',
		code: 'CA',
		lowercase: 'Aquesta cançó, però, és una qüestió difícil: així que el meu veí, tot i la seva traïció durant el cafè, creu que això està molt útil per a la nostra plaça.',
	},
	{
		lang: 'ro',
		language: 'Romanian',
		code: 'RO',
		lowercase: 'Mă duc în țara românilor, unde șapte case stau lângă câmp.',
	},
	{
		lang: 'sv',
		language: 'Swedish',
		code: 'SV',
		lowercase: 'Flygande bäckasiner söka hwila på mjuka tuvor.',
	},
	{
		lang: 'tr',
		language: 'Turkish',
		code: 'TR',
		lowercase: 'Pijamalı hasta yağız şoföre çabucak güvendi.',
	},
	{
		lang: 'no',
		language: 'Norwegian',
		code: 'NO',
		lowercase: 'Vår sære Zulu fra badeøya spilte jo whist og quickstep i min taxi.',
	},
	{
		lang: 'fi',
		language: 'Finnish',
		code: 'FI',
		lowercase: 'Albert osti fagotin ja töräytti puhkuvan melodian.',
	},
	{
		lang: 'hu',
		language: 'Hungarian',
		code: 'HU',
		lowercase: 'Az árvíztűrő tükörfúrógép egy híres magyar kifejezés.',
	},
	{
		lang: 'cs',
		language: 'Czech',
		code: 'CS',
		lowercase: 'Příliš žluťoučký kůň úpěl ďábelské ódy, které znal už dávno.',
	},
	{
		lang: 'da',
		language: 'Danish',
		code: 'DA',
		lowercase: 'Quizdeltagerne spiste jordbær med fløde, mens cirkusklovnen Walther spillede på xylofon.',
	},
	{
		lang: 'hr',
		language: 'Croatian',
		code: 'HR',
		lowercase: 'Čovjek iz kuće došao je u šumu gdje žena i đak čekaju.',
	},
	{
		lang: 'bg',
		language: 'Bulgarian',
		code: 'BG',
		lowercase: 'Ах, чудна българска земьо, полюшвай цъфтящи жита.',
	},
	{
		lang: 'uk',
		language: 'Ukrainian',
		code: 'UK',
		lowercase: 'Їжак біля ґанку їсть їжу, а мій сусід говорить про єдність і мир.',
	},
];

export const characterSets: CharacterSet[] = [
	{
		label: 'ASCII punctuation',
		text: '!"#&\'(),./:;?@[\\]^_`{|}~',
	},
	{
		label: 'Typographic punctuation',
		text: '– — ‘ ’ ‚ “ ” „ « » • … ‹ › ™ ‰ ⁄',
	},
	{
		label: 'Mathematical',
		text: '0123456789 % * + - − < = > × ÷ ≈ ≠ ≤ ≥ ±',
	},
	{
		label: 'Currency',
		text: '$ € ¢ £ ¥',
	},
	{
		label: 'Latin-1 symbols',
		text: '¡ © ® ° · ¿ ª º',
	},
	{
		label: 'Diacritics & ligatures',
		text: 'Ĩ ĩ Ũ ũ Ŷ ŷ Ẽ ẽ Ỳ ỳ Ỹ ỹ ẞ ﬁ ﬂ',
	},
	{
		label: 'Spacing modifiers',
		text: '¨ ´ ¸ ˆ ˜ ô',
	},
	{
		label: 'Arrows',
		text: '← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙',
	},
	{
		label: 'Spaces',
		text: '— — — — —',
	},
];
