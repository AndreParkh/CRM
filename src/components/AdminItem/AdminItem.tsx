import { Box, Button, MenuItem, TextField } from '@mui/material'
import { AdminItemProps } from './AdminItem.props'
import { useState } from 'react'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { IUpdateAdminItem } from '../../Pages/adminPage.interfaces'
import styles from './AdminItem.module.css'
import { adminItemOptions } from './AdminItemOptions'



export const AdminItem = ({ item, onUpdate, onDelete }: AdminItemProps): JSX.Element => {

	const { handleSubmit, control } = useForm<IUpdateAdminItem>({
		defaultValues: item,
	})

	const { errors } = useFormState({ control })

	const [isUpdate, setIsUpdate] = useState(false)

	return (<>
		<form onSubmit={handleSubmit(data => {
			onUpdate(item.id, data)
			setIsUpdate(false)
		})}>
			<Box
				sx={{
					width: "1520px",
					height: "50px",
					// margin: "30px auto",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<p className={styles.id}>{item.id}</p>
				{!isUpdate && <p className={styles.name}>{item.name}</p>}
				{isUpdate && <Controller
					control={control}
					name='name'
					render={({ field }) => (
						<TextField
							label="Имя"
							size="small"
							sx={{ width: "200px" }}
							defaultValue={field.value}
							onChange={field.onChange}
							error={!!errors.name?.message}
							helperText={errors.name?.message}
						/>
					)}
				/>}
				<p className={styles.translit}>{item.translit}</p>
				{!isUpdate && <p className={styles.type}>{item.type}</p>}
				{isUpdate && <Controller
					control={control}
					name='type'
					rules={{ required: 'Обязательно для заполнения' }}
					render={({ field }) => (
						<TextField
							select
							label="Тип"
							sx={{ width: "150px" }}
							value={field.value}
							onChange={field.onChange}
							error={!!errors.name?.message}
							helperText={errors.name?.message}
						>
							{adminItemOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					)}
				/>}
				{!isUpdate && <p className={styles.description}>{item.description}</p>}
				{isUpdate && <Controller
					control={control}
					name='description'
					render={({ field }) => (
						<TextField
							label="Описание"
							size="small"
							sx={{ width: "400px" }}
							defaultValue={field.value}
							onChange={field.onChange}
							error={!!errors.name?.message}
							helperText={errors.name?.message}
						/>
					)}
				/>}
				{!isUpdate && <Button
					sx={{
						width: "200px",
						bgcolor: "#0871A4",
						textTransform: "none",
						color: "#fff",
						"&:hover": { bgcolor: "#0b8dce" },
					}}
					onClick={() => setIsUpdate(true)}
				>
					Редактировать
				</Button>}

				{!isUpdate && <Button
					sx={{
						width: "200px",
						bgcolor: "#F30021",
						textTransform: "none",
						color: "#fff",
						"&:hover": { bgcolor: "#ca001b" },
					}}
					onClick={() => onDelete(item.id)}
				>
					Удалить
				</Button>}
				{isUpdate && <Button
					type='submit'
					sx={{
						width: "200px",
						bgcolor: "#0871A4",
						textTransform: "none",
						color: "#fff",
						"&:hover": { bgcolor: "#0871A4" },
					}}
				>
					Подтвердить
				</Button>}
				{isUpdate && <Button
					sx={{
						width: "200px",
						bgcolor: "#F30021",
						textTransform: "none",
						color: "#fff",
						"&:hover": { bgcolor: "#F30021" },
					}}
					onClick={() => setIsUpdate(false)}
				>
					Отмена
				</Button>}
			</Box>
		</form >
	</>
	)
}
