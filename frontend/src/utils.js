export default {
	replaceToN(text) {
		return text.replace(/<br>/gi, "\n");
	},
	
	replaceToBr(text) {
		text = text.replace(/\n{2,}/gi, "<br><br>");
		text = text.replace(/\n/gi, "<br>");

		return text;
	}
}