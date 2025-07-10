import "./EditArticleForm.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserArticle,
  getCurrentArticle,
} from "../store/slicers/articleSlicer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { message, Button } from "antd";

const EditArticleForm = () => {
  const { article } = useParams();
  const { title, description, tags, body, slug } = useSelector(
    (state) => state.article,
  );
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getCurrentArticle(article));
  }, [article, dispatch]);

  const schema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(30, "Title must be at most 50 characters"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must be at most 200 characters"),
    body: Yup.string()
      .trim()
      .required("Article text is required")
      .min(50, "Text must be at least 50 characters")
      .max(5000, "Text must be at most 5000 characters"),
    tags: Yup.array()
      .of(
        Yup.object().shape({
          Tag: Yup.string()
            .trim()
            .required("Tag cannot be empty")
            .max(10, "Tag must be at most 10 characters"),
        }),
      )
      .min(1, "At least one tag is required")
      .test("unique-tags", "Tags must be unique", (value) => {
        if (!value) return true;
        const tagValues = value.map((tagObj) =>
          tagObj.Tag?.toLowerCase().trim(),
        );
        const uniqueTagValues = new Set(tagValues);
        return uniqueTagValues.size === tagValues.length;
      }),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tags: [{ Tag: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  useEffect(() => {
    setValue("title", title || "");
    setValue("body", body || "");
    setValue("description", description || "");
    if (Array.isArray(tags)) {
      const formattedTags = tags.map((tag) => ({ Tag: tag }));
      setValue("tags", formattedTags);
    }
  }, [title, body, description, tags, setValue]);

  const onSubmitHandler = (data) => {
    const tagsArray = data.tags.map((el) => el.Tag);
    dispatch(
      updateUserArticle({
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: tagsArray,
        slug: slug,
      }),
    ).then(() =>
      messageApi.open({
        type: "success",
        content: "Article updated successfully",
      }),
    );
  };

  return (
    <form className="form-article" onSubmit={handleSubmit(onSubmitHandler)}>
      {contextHolder}
      <div className="card-title">Edit article</div>
      <div className="form__wrap">
        <div>
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Title"
          />
          {errors.title && (
            <p className="validation-error-message">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description">Short description</label>
          <input
            {...register("description")}
            type="text"
            id="description"
            placeholder="Short description"
          />
          {errors.description && (
            <p className="validation-error-message">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="body">Text</label>
          <textarea {...register("body")} id="body" placeholder="Text" />
          {errors.body && (
            <p className="validation-error-message">{errors.body.message}</p>
          )}
        </div>
        <div className="Tags">
          <label>Tags</label>
          <div className="Tags__controls">
            <ul>
              {fields.map((item, index) => (
                <li key={item.id} className="Tags-flex">
                  <input
                    {...register(`tags.${index}.Tag`)}
                    defaultValue={item.Tag}
                    placeholder="Tag"
                  />
                  {errors.tags?.[index]?.Tag && (
                    <p className="validation-error-message">
                      {errors.tags[index].Tag.message}
                    </p>
                  )}
                  <Button
                    danger
                    style={{
                      fontWeight: "400",
                      fontSize: "18px",
                      padding: "8px 12px",
                      height: "37.27px",
                      width: "118px",
                    }}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
            {errors.tags?.message && (
              <p className="validation-error-message">{errors.tags.message}</p>
            )}
            <Button
              style={{
                fontWeight: "400",
                fontSize: "18px",
                padding: "8px 12px",
                height: "37.27px",
                width: "118px",
                marginBottom: "5px",
              }}
              color="primary"
              variant="outlined"
              type="button"
              onClick={() => append({ Tag: "" })}
            >
              Add Tag
            </Button>
          </div>
        </div>
      </div>
      <input className="button button_blue" type="submit" value="Send" />
    </form>
  );
};

export default EditArticleForm;
