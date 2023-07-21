import { Formik, Field, Form } from "formik";
import { FilterType } from "../redux/users-reducer";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = (props) => {
  const submit = (
    values: FilterType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    props.onFilterChanged(values);
  };
  return (
    <div>
      <Formik
        initialValues={{ term: "" }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
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
};

export default UsersSearchForm;
