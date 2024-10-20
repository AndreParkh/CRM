// import { Box, TextField, Button } from "@mui/material";
// import { ChangeEvent, FC, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AdminPage: FC = () => {
//   interface IPostAdminData {
//     name: string;
//     description?: string;
//     type?: string;
//   }

//   interface IPutAdminData {
//     new_name: string;
//     new_traslit: string;
//     new_description: string;
//     new_type: string;
//   }

//   interface IGetAdminData {
//     id?: number | undefined;
//     name: string;
//     translit: string;
//     description: string;
//     type: string;
//     createdAt: string;
//     updatedAt: string;
//   }

//   let token: string | null = localStorage.getItem("O-auth-token");

//   if (!token) {
//     window.location.href = "/";
//   }

//   const [adminData, setAdminData] = useState<IPostAdminData>({
//     name: "",
//     description: "",
//     type: "",
//   });

//   const { name, description, type } = adminData;

//   const [editId, setEditId] = useState<number | null>(null);

//   const handleChangeDataUpdateForm = (id: number) => {
//     if (editId === id) {
//       setEditId(null);
//     } else {
//       setEditId(id);
//     }
//   };

//   const [updateAdminData, setUpdateAdminData] = useState<IPutAdminData>({
//     new_name: "",
//     new_traslit: "",
//     new_description: "",
//     new_type: "",
//   });

//   const { new_name, new_description, new_type } = updateAdminData;

//   const [data, setData] = useState<IGetAdminData[]>([]);

//   const SortAdminDataById = () => {
//     if (!Array.isArray(data)) {
//       return;
//     }
//     //@ts-ignore
//     setData((d) => d.sort((x, y) => x.id - y.id));
//   };

//   const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setAdminData((prev) => ({
//       ...prev,
//       name: e.target.value,
//     }));
//   };

//   const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setAdminData((prev) => ({
//       ...prev,
//       description: e.target.value,
//     }));
//   };

//   const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setAdminData((prev) => ({
//       ...prev,
//       type: e.target.value,
//     }));
//   };

//   const handleUpdateNameChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setUpdateAdminData((prev) => ({
//       ...prev,
//       name: e.target.value,
//     }));
//   };

//   const handleUpdateDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setUpdateAdminData((prev) => ({
//       ...prev,
//       description: e.target.value,
//     }));
//   };

//   const handleUpdateTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setUpdateAdminData((prev) => ({
//       ...prev,
//       type: e.target.value,
//     }));
//   };

//   const getAdminDataField = async () => {
//     const getAdminData = await axios.get<IGetAdminData[]>(
//       "https://387f47aeacc8.vps.myjino.ru/api/adminField/getAll"
//     );

//     setData(getAdminData.data);
//   };

//   useEffect(() => {
//     getAdminDataField();
//   }, []);

//   const setAdminDataField = async () => {
//     try {
//       await axios.post(
//         "https://387f47aeacc8.vps.myjino.ru/api/adminField/create",
//         adminData
//       );
//     } catch (err: any | string) {
//       toast.error(err);
//     }
//   };

//   //@ts-ignore
//   const updateAdminDataField = async (ident: number) => {
//     try {
//       const updateAdminDataForm = await axios.put(
//         "https://387f47aeacc8.vps.myjino.ru/api/adminField/update",
//         {
//           id: ident,
//           ...updateAdminData,
//         }
//       );

//       console.log(updateAdminDataForm);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   async function removeAdminDataField(ident: number | undefined) {
//     if (ident === undefined) return;

//     try {
//       const deleteResponse = await axios.delete(
//         "https://387f47aeacc8.vps.myjino.ru/api/adminField/delete",
//         //@ts-ignore
//         { data: { id: ident } }
//       );

//       console.log(deleteResponse);
//       setData((prevData) => prevData.filter((item) => item.id !== ident));
//     } catch (error: any | string) {
//       console.error(
//         "Ошибка при удалении:",
//         error.response?.data || error.message
//       );
//     }
//   }

//   return (
//     <Box>
//       <Box
//         sx={{
//           marginTop: "100px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "30px",
//         }}
//       >
//         <TextField
//           label="Имя"
//           size="small"
//           variant="outlined"
//           defaultValue={name}
//           onChange={handleNameChange}
//           sx={{ width: "300px" }}
//         />
//         <TextField
//           label="Описание"
//           size="small"
//           variant="outlined"
//           value={description}
//           onChange={handleDescriptionChange}
//           sx={{ width: "300px" }}
//         />
//         <select
//           value={type}
//           onChange={handleTypeChange}
//           style={{ width: "300px", height: "40px" }}
//         >
//           <option value="" selected>
//             Выберите тип
//           </option>
//           <option value="string">Текстовое поле</option>
//           <option value="int">Целое число</option>
//           <option value="float64">Дробное число</option>
//         </select>

//         <Button
//           onClick={setAdminDataField}
//           sx={{
//             "&:hover": { bgcolor: "#1435AD", color: "#fff" },
//             bgcolor: "#61B7CF",
//             color: "#000",
//             textTransform: "none",
//             width: "200px",
//           }}
//         >
//           Создать пост
//         </Button>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//           flexWrap: "wrap",
//         }}
//       >
//         {data.map((item) => (
//           <Box
//             key={item.id}
//             sx={{
//               width: "1520px",
//               margin: "30px auto",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-around",
//             }}
//           >
//             {editId !== item.id && (
//               <Box
//                 sx={{
//                   width: "1520px",
//                   margin: "30px auto",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                 }}
//               >
//                 <div>{item.id}</div>
//                 <div>{item.name}</div>
//                 <div>{item.translit}</div>
//                 <div>{item.type}</div>
//                 <div>{item.description}</div>
//                 <Button
//                   sx={{
//                     width: "300px",
//                     bgcolor: "#0871A4",
//                     textTransform: "none",
//                     color: "#fff",
//                     "&:hover": { bgcolor: "#0871A4" },
//                   }}
//                   //@ts-ignore
//                   onClick={() => handleChangeDataUpdateForm(item.id)}
//                 >
//                   Редактировать
//                 </Button>
//                 <Button
//                   sx={{
//                     width: "200px",
//                     bgcolor: "#F30021",
//                     textTransform: "none",
//                     color: "#fff",
//                     "&:hover": { bgcolor: "#F30021" },
//                   }}
//                   onClick={() => removeAdminDataField(item.id)}
//                 >
//                   Удалить
//                 </Button>
//               </Box>
//             )}

//             {editId === item.id && (
//               <Box
//                 sx={{
//                   width: "1520px",
//                   margin: "30px auto",
//                   display: "flex",
//                   justifyContent: "space-around",
//                   alignItems: "center",
//                 }}
//               >
//                 <TextField
//                   label="Имя"
//                   size="small"
//                   defaultValue={new_name}
//                   onChange={handleUpdateNameChange}
//                 />
//                 <TextField
//                   label="Описание"
//                   size="small"
//                   defaultValue={new_description}
//                   onChange={handleUpdateDescriptionChange}
//                 />

//                 <select
//                   defaultValue={new_type}
//                   onChange={handleUpdateTypeChange}
//                   style={{ width: "200px", height: "40px" }}
//                 >
//                   <option value="" selected>
//                     Выберите тип
//                   </option>
//                   <option value="string">Текстовое поле</option>
//                   <option value="int">Целое число</option>
//                   <option value="float64">Дробное число</option>
//                 </select>

//                 <Button
//                   sx={{
//                     width: "150px",
//                     bgcolor: "#0871A4",
//                     textTransform: "none",
//                     color: "#fff",
//                     "&:hover": { bgcolor: "#0871A4" },
//                   }}
//                   onClick={() => {
//                     item.id && updateAdminDataField(item.id),
//                       setEditId(null),
//                       SortAdminDataById();
//                   }}
//                 >
//                   Подтвердить
//                 </Button>

//                 <Button
//                   sx={{
//                     width: "150px",
//                     bgcolor: "#F30021",
//                     textTransform: "none",
//                     color: "#fff",
//                     "&:hover": { bgcolor: "#F30021" },
//                   }}
//                   onClick={() => setEditId(null)}
//                 >
//                   Отмена
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default AdminPage;