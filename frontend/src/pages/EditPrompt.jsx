import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/axios";


function EditPrompt() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [categories, setCategories] = useState([]);


    useEffect(() => {

        async function loadData() {

            try {

                const promptResponse =
                    await api.get(`/prompts/${id}`);


                const categoryResponse =
                    await api.get("/categories");


                const prompt = promptResponse.data;


                setTitle(prompt.title);
                setDescription(prompt.description);
                setContent(prompt.content);
                setCategoryId(prompt.category_id);


                setCategories(categoryResponse.data);


            } catch(error) {

                console.error(error);

            }

        }


        loadData();


    }, [id]);



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            await api.put(`/prompts/${id}`, {

                title,
                description,
                content,
                category_id: categoryId

            });


            navigate("/");


        } catch(error) {

            console.error(error);

        }

    };


    return (

        <div style={{padding:"30px"}}>

            <h2>Edit Prompt</h2>


            <form onSubmit={handleSubmit}>


                <input
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />


                <br/><br/>


                <input
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />


                <br/><br/>


                <textarea
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                />


                <br/><br/>


                <select
                    value={categoryId}
                    onChange={(e)=>setCategoryId(e.target.value)}
                >

                    {
                        categories.map(category => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))
                    }

                </select>


                <br/><br/>


                <button type="submit">
                    Save Changes
                </button>


            </form>


        </div>

    );

}


export default EditPrompt;