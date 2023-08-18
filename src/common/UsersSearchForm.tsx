import { Formik, Field, Form, FormikHelpers } from "formik";
import { FilterType } from "../redux/users-reducer";
import React from "react";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../redux/users-selectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string;
  friend: "true" | "false" | "null" | string;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);
  const submit = (
    values: FormType,
    // { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    { setSubmitting }: FormikHelpers<FormType>
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
          ? true
          : false,
    };

    props.onFilterChanged(filter);
    setSubmitting(false);
  };
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button
              className="common__button"
              type="submit"
              disabled={isSubmitting}
            >
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
