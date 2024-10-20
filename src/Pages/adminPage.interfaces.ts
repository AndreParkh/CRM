export interface ICreateAdminItem {
	name: string;
	description: string;
	type: string;
}

export interface IUpdateAdminItem {
	id: number;
	name: string;
	description: string;
	type: string;
}

export interface IUpdateAdminItemResponse {
	id: number;
	name: string;
	translit: string;
	description: string;
	type: string;
}

export interface IAdminItem {
	id: number;
	name: string;
	translit: string;
	description: string;
	type: string;
	createdAt: string;
	updatedAt: string;
}