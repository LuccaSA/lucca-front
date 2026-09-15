export interface GlyphCharacter {
	char: string;
	codePoint: string;
	startsBucket: boolean;
}

export const GLYPH_TEXT_SELECTOR = '.glyphsGrid-glyph';

export const glyphsGridStyles = `
	.glyphsGrid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
		gap: 1px;
		background-color: var(--commons-border-200);
		border: 1px solid var(--commons-border-200);
	}

	.glyphsGrid-cell {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		background-color: var(--commons-background-base);
		padding: var(--pr-t-spacings-75);
	}

	.glyphsGrid-bucketDivider {
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 1;
		font-family: monospace;
		font-size: var(--pr-t-font-body-XS-fontSize);
		color: var(--palettes-neutral-600);
	}
`;

const FONT_EXTENDED_RANGE =
	'U+0102-0107, U+010C-0111, U+0118-011B, U+011E-011F, U+0128-0129, U+0130-0131, U+0141-0144, U+0147-0148, U+0150-0151, U+0158-015B, U+015E-0161, U+0164-0165, U+0168-0169, U+016E-0171, U+0176-0177, U+0179-017E, U+0218-021B, U+02C6, U+02DC, U+0302, U+1E9E, U+1EBC-1EBD, U+1EF2-1EF3, U+1EF8-1EF9, U+2190-2199, U+2248, U+2260, U+2264-2265';

const EXTENDED_CODE_POINTS = parseUnicodeRange(FONT_EXTENDED_RANGE);

// prettier-ignore
const GLYPH_ORDER: readonly string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","À","Á","Â","Ã","Ä","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ñ","Ò","Ó","Ô","Õ","Ö","Ù","Ú","Û","Ü","Ý","Œ","Ÿ","Å","Ø","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ß","à","á","â","ã","ä","æ","ç","è","é","ê","ë","ì","í","î","ï","ñ","ò","ó","ô","õ","ö","ù","ú","û","ü","ý","ÿ","œ","ª","º","å","ø","Є","І","Ї","А","Б","В","Г","Д","Е","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ь","Ю","Я","Ґ","а","б","в","г","д","е","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ь","ю","я","є","і","ї","ґ","0","1","2","3","4","5","6","7","8","9","!","\"","#","&","'","(",")",",",".","/",":",";","?","@","[","\\","]","_","`","{","|","}","~","^","‰","⁄","«","»","–","—","‘","’","‚","“","”","„","•","…","‹","›","™","%","*","+","-","<","=",">","×","÷","−","±","¢","£","¥","$","€","¡","©","®","°","·","¿","ﬁ","ﬂ","¨","´","¸"," "," "," "," ","Ă","Ą","Ć","Č","Ď","Đ","Ę","Ě","Ğ","İ","Ł","Ń","Ň","Ő","Ř","Ś","Ş","Š","Ť","Ů","Ű","Ź","Ż","Ž","Ș","Ț","ˆ","ă","ą","ć","č","ď","đ","ę","ě","ğ","ı","ł","ń","ň","ő","ř","ś","ş","š","ť","ů","ű","ź","ż","ž","ș","ț","≈","≠","≤","≥","Ĩ","ĩ","Ũ","ũ","ẞ","Ẽ","ẽ","Ỳ","ỳ","Ỹ","ỹ","Ŷ","ŷ","˜","←","↑","→","↓","↔","↕","↖","↗","↘","↙"];

export function extractGlyphCharacters(): GlyphCharacter[] {
	let previousIsExtended: boolean | null = null;

	return GLYPH_ORDER.map((char) => {
		const codePoint = char.codePointAt(0) ?? 0;
		const isExtended = EXTENDED_CODE_POINTS.has(codePoint);
		const startsBucket = previousIsExtended !== null && previousIsExtended !== isExtended;
		previousIsExtended = isExtended;

		return {
			char,
			codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
			startsBucket,
		};
	});
}

function parseUnicodeRange(range: string): Set<number> {
	const codePoints = new Set<number>();

	for (const part of range.split(',')) {
		const [start, end] = part
			.trim()
			.replace(/^U\+/, '')
			.split('-')
			.map((hex) => parseInt(hex, 16));
		for (let codePoint = start; codePoint <= (end ?? start); codePoint++) {
			codePoints.add(codePoint);
		}
	}

	return codePoints;
}
