import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IAdminItem, IUpdateAdminItem } from '../../Pages/adminPage.interfaces';

export interface AdminItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLDivElement> {
	item: IAdminItem
	onUpdate: (itemId: number, updatedItem: IUpdateAdminItem) => void;
	onDelete: (itemId: number) => void;
} 