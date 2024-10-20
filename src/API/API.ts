
import axios from "axios";
import { IAdminItem, ICreateAdminItem, IUpdateAdminItem } from '../Pages/adminPage.interfaces';


export const API = {
	adminField: {
		get: async (): Promise<IAdminItem[]> => {
			const response = await axios.get(
				`${import.meta.env.VITE_DOMAIN}/api/adminField/getAll`
			)
			return response.data
		},
		create: (data: ICreateAdminItem): Promise<IAdminItem> =>
			axios.post(`${import.meta.env.VITE_DOMAIN}/api/adminField/create`,
				data,
				{
					headers: { "Content-Type": "application/json" },
				}
			).then(response => response.data),

		update: (data: IUpdateAdminItem): Promise<IUpdateAdminItem> => axios.put(
			`${import.meta.env.VITE_DOMAIN}/api/adminField/update`,
			data,
			{
				headers: { "Content-Type": "application/json" }
			}).then(response => response.data),

		delete: (id: number) => axios.delete(
			`${import.meta.env.VITE_DOMAIN}/api/adminField/delete`,
			{
				headers: { "Content-Type": "application/json" },
				data: { id }
			})
	}
}
