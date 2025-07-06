import './EditArticleForm.scss';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray, Controller  } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux';
import {updateUserArticle} from "../store/slicers/articleSlicer";
import { getCurrentArticle } from '../store/slicers/articleSlicer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const EditArticleForm = () => {
    const { article } = useParams();
  const {title, author, description, favoritesCount, tags, body, createdAt,slug} = useSelector(state=>state.article);

  useEffect(()=> {
    dispatch(getCurrentArticle(article));
    console.log(title)
  }, []);

   useEffect(() => {
            setValue('title', title);
            setValue('body', body);
            setValue('description', description)
            if (Array.isArray(tags)) {
              const formattedTags = tags.map(tag => ({ Tag: tag }));
              setValue('tags', formattedTags);
            }
        }, [title, body, description, tags]);
    const dispatch = useDispatch();
     const schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must be at most 50 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(20, "Description must be at most 200 characters"),

  body: Yup.string()
    .required("Article text is required")
    .min(5, "Text must be at least 50 characters")
    .max(500, "Text must be at most 5000 characters"),

  tags: Yup.array()
    .of(
      Yup.object().shape({
        Tag: Yup.string()
          .required("Tag cannot be empty")
          .max(10, "Tag must be at most 10 characters"),
      })
    )
    .min(1, "At least one tag is required").test(
    "unique-tags",
    "Tags must be unique",
    (value) => {
      if (!value) return true;
      const tagValues = value.map(tagObj => tagObj.Tag?.toLowerCase().trim());
      const uniqueTagValues = new Set(tagValues);
      return uniqueTagValues.size === tagValues.length;
    }
  )
});
        
        const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
             resolver: yupResolver(schema),
  defaultValues: {
    title: '',
    description: '',
    body: '',
    tags: [{Tag:''}]  // начальное значение массива},
  },
        });
        const { fields, append, remove } = useFieldArray({
            control, // control props comes from useForm (optional: if you are using FormProvider)
            name: "tags", // unique name for your Field Array
        });
        
        const onSubmitHandler = (data) => {
           let tagsArray;
            tagsArray = data.tags.map(el=> el.Tag); 
            dispatch(updateUserArticle( {
                title: data.title,
                description: data.description,
                body: data.body,
                tagList: tagsArray,
                slug: slug
              }));
    
        };
    return (
    <form className="form-article" onSubmit={handleSubmit(onSubmitHandler)}>
  <div className="card-title">Edit article</div>
  <div className="form__wrap">
    <div>
      <label htmlFor="title">Title</label>
      <input {...register("title")} type="text" id="title" placeholder="Title" required />
    </div>
    <div>
      <label htmlFor="description">Short description</label>
      <input {...register("description")} type="text" id="description" placeholder="Short description" required/>
    </div>
    <div>
      <label htmlFor="body">Text</label>
      <textarea {...register("body")} id="body" placeholder="Text" required />
    </div>
    <div>
      <label>Tags</label>
      <ul>
        {fields.map((item, index) => (
            <li key={item.id}>
                <input {...register(`tags.${index}.Tag`)} defaultValue={item.Tag} placeholder="Tag" />
                {errors.tags?.[index]?.Tag && (
                <p className="error">{errors.tags[index].Tag.message}</p>
                )}
                <button type="button" onClick={() => remove(index)}>Delete</button>
            </li>
            ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ Tag: "" })}
      >
        Add Tag
      </button>
    </div>
  </div>
  <input className="button button_blue" type="submit" value="Send" />
</form>

    )
    ;
}

export default EditArticleForm;