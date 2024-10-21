import { Box, Button, MenuItem, TextField } from '@mui/material'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { IAdminItem, ICreateAdminItem, IUpdateAdminItem } from './adminPage.interfaces'
import { API } from '../API/API'
import { useEffect, useState } from 'react'
import { AdminItem } from '../components/AdminItem/AdminItem'
import styles from './AdminPage.module.css'
import { adminItemOptions } from '../components/AdminItem/AdminItemOptions'

export const AdminPage = (): JSX.Element => {

	if (!localStorage.getItem('O-auth-token')) {
		window.location.href = "/";
	}

	const [adminItems, setAdminItems] = useState<IAdminItem[]>([])

	const { handleSubmit, control } = useForm<ICreateAdminItem>({
		defaultValues: {
			name: 'newTestName',
			description: 'newTestDescr',
			type: 'string'
		}
	})

	const { errors } = useFormState({ control })

	useEffect(() => {
		API.adminField.get()
			.then(data => setAdminItems(data.sort((x: IAdminItem, y: IAdminItem) => x.id - y.id)))
			.catch(error => console.error(error))
	}, []);


	const handleCreate = (data: ICreateAdminItem) => {
		const response = API.adminField.create(data)
		response
			.then(data => setAdminItems([...adminItems, data]))
			.catch(error => console.error(error))
	}

	const handleUpdate = (id: number, data: IUpdateAdminItem) => {
		const response = API.adminField.update({ ...data, id })
		response
			.then(data => setAdminItems(adminItems.map(item => item.id === id ? { ...item, ...data } : item)))
			.catch(error => console.error(error))
	}

	const handleDelete = (id: number) => {
		const response = API.adminField.delete(id)
		response
			.then(() => setAdminItems(adminItems.filter(item => item.id !== id)))
			.catch(error => console.error(error))
	}

	return <>
		<Box>
			<form onSubmit={handleSubmit(handleCreate)}>
				<Box
					sx={{
						marginTop: "100px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: "30px",
					}}
				>
					<Controller
						control={control}
						name='name'
						rules={{ required: 'Обязательно для заполнения' }}
						render={({ field }) => (
							<TextField
								label="Имя"
								size="small"
								variant="outlined"
								sx={{ width: "300px" }}
								onChange={(e) => field.onChange(e)}
								value={field.value}
								error={!!errors.name?.message}
								helperText={errors.name?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name='description'
						rules={{ required: 'Обязательно для заполнения' }}
						render={({ field }) => (
							<TextField
								label="Описание"
								size="small"
								variant="outlined"
								sx={{ width: "300px" }}
								onChange={(e) => field.onChange(e)}
								value={field.value}
								error={!!errors.description?.message}
								helperText={errors.description?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name='type'
						rules={{ required: 'Обязательно для заполнения' }}
						render={({ field }) => (
							<TextField
								select
								label="Тип"
								sx={{ width: "300px" }}
								value={field.value}
								onChange={field.onChange}
								error={!!errors.type?.message}
								helperText={errors.type?.message}
							>
								{adminItemOptions.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						)}
					/>

					<Button
						type='submit'
						sx={{
							"&:hover": { bgcolor: "#1435AD", color: "#fff" },
							bgcolor: "#61B7CF",
							color: "#000",
							textTransform: "none",
							width: "200px",
						}}
					>
						Добавить
					</Button>
				</Box>
			</form>
			<Box
				sx={{
					width: "1520px",
					margin: "10px auto",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<p className={styles.id}>id</p>
				<p className={styles.name}>Имя</p>
				<p className={styles.translit}>Транслит</p>
				<p className={styles.type}>Тип</p>
				<p className={styles.description}>Описание</p>
				<p className={styles.button}></p>
				<p className={styles.button}></p>
			</Box>
			{!adminItems && <div> ... загрузка данных ...</div>}
			{adminItems?.map(item => (
				<Box
					key={item.id}
					sx={{
						width: "1520px",
						margin: "30px auto",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
					}}
				>
					<AdminItem
						item={item}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				</Box>)
			)}
		</Box >
	</>
}