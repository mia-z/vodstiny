import axios from "axios";

export const getVyneerYoutubeVods = async (): Promise<Vyneer.Vod[]> => {
	const res = await axios.get<Vyneer.Vod[]>("https://vyneer.me/tools/ytvods");
	return res.data;
};
