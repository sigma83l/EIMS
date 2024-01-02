import React from "react";
import CoordinatorLayout from "../../../layout/coordinator/layout";
import { useFormik } from "formik";
import * as Yup from "yup";


const SupervisorAccount = () => {
  const formik = useFormik({
    initialValues: {
      supervisor: {
        name: "",
        role: "",
        surname: "",
        department: "",
        email: "",
      },
      student: {
        name: "",
        surname: "",
        regNo: "",
        email: "",
      },
    },
    validationSchema: Yup.object({
      supervisor: Yup.object({
        name: Yup.string().required("Name is required"),
        role: Yup.string().required("Role within company is required"),
        surname: Yup.string().required("Surname is required"),
        department: Yup.string().required("Field/Department is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      }),
      student: Yup.object({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        regNo: Yup.string().required("Registration Number is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values); // Handle form submission logic for both supervisor and student
    },
  });

  return (
    <CoordinatorLayout>
      <div className="p-4 flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-[#003976]">
          Add New Supervisor
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-16">
          <div className="bg-gray-200 p-10">
            <h1 className="text-2xl font-bold text-blue-900">Supervisor</h1>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="col-span-1">
                <label htmlFor="supervisor.name">Name</label>
                <input
                  id="supervisor.name"
                  name="supervisor.name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.name}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.name &&
                  formik.touched.supervisor?.name && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.name}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.name">Role Within Company</label>
                <input
                  id="supervisor.role"
                  name="supervisor.role"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.role}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.role &&
                  formik.touched.supervisor?.role && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.role}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.name">Surname</label>
                <input
                  id="supervisor.surname"
                  name="supervisor.surname"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.surname}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.surname &&
                  formik.touched.supervisor?.surname && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.surname}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.name">Field/Department</label>
                <input
                  id="supervisor.department"
                  name="supervisor.department"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.department}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.department &&
                  formik.touched.supervisor?.department && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.department}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.name">Email</label>
                <input
                  id="supervisor.email"
                  name="supervisor.email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.email}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.email &&
                  formik.touched.supervisor?.email && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.email}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 p-10">
            <h1 className="text-2xl font-bold text-blue-900">Student</h1>
            <div className="mt-4 gap-5 grid grid-cols-1 lg:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="student.name">Name</label>
                <input
                  id="student.name"
                  name="student.name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.name}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.name &&
                  formik.touched.student?.name && (
                    <div className="text-red-500">
                      {formik.errors.student.name}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="student.regNo">Reg No</label>
                <input
                  id="student.regNo"
                  name="student.regNo"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.regNo}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.regNo &&
                  formik.touched.student?.regNo && (
                    <div className="text-red-500">
                      {formik.errors.student.regNo}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="student.surname">Surname</label>
                <input
                  id="student.surname"
                  name="student.surname"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.surname}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.surname &&
                  formik.touched.student?.surname && (
                    <div className="text-red-500">
                      {formik.errors.student.surname}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="student.email">Email</label>
                <input
                  id="student.email"
                  name="student.email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.email}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.email &&
                  formik.touched.student?.email && (
                    <div className="text-red-500">
                      {formik.errors.student.email}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-[#003976] text-white rounded-full py-3 px-10 mt-4">
              Submit & Create Account
            </button>
          </div>
        </form>
      </div>
    </CoordinatorLayout>
  );
};

export default SupervisorAccount;
