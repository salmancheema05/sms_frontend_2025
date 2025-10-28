import React, { useEffect, useState } from "react";
import User from "@/assets/user.png";
import { useParams } from "react-router-dom";
import {
  useGetTeacherapiMutation,
  useGetTeacherImageMutation,
} from "@/services/teacher";
import { useSelector } from "react-redux";
import useCreateToken from "@/hooks/createNewToken";
import { getOnlyDate } from "@/utilities/dateformate";
const TeacherDetail = () => {
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );

  const { teacher_id } = useParams();
  const [getTeacherapi] = useGetTeacherapiMutation();
  const [getTeacherImage] = useGetTeacherImageMutation();
  const { createNewToken } = useCreateToken();
  const teacher = {
    name: "Dr. Sarah Johnson",
    subject: "Computer Science",
    email: "sarah.johnson@example.com",
    phone: "+92 300 9876543",
    experience: "12 Years",
    gender: "Female",
    userStatus: "Active",
    imageUrl: "https://via.placeholder.com/300x400.png?text=Teacher+Image",
    qualifications: [
      { degree: "PhD in Artificial Intelligence", university: "MIT" },
      { degree: "MSc in Computer Science", university: "Stanford University" },
      {
        degree: "BSc in Software Engineering",
        university: "Harvard University",
      },
    ],
  };
  const [teacherData, setTeacherData] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const getTeacher = async () => {
    if (token) {
      const res = await getTeacherapi({
        token: token,
        school_id: school_id,
        school_teacher_id: teacher_id,
      });
      if (res.data.error) {
        await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
      } else {
        setTeacherData(res.data.result);
        if (res.data.result.teacher_pic !== "no image") {
          await viewImage(res.data.result.teacher_pic);
        }
      }
    }
  };
  const viewImage = async (name) => {
    try {
      const res = await getTeacherImage({
        imageendpoint: name,
        foldername: "teachers",
        token: token,
      });
      const objectUrl = URL.createObjectURL(res.data);
      setDisplayImage(objectUrl);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTeacher();
  }, [token]);
  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-primary-bg rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Profile Image */}
        <div className="md:w-1/3 bg-primary-color flex items-center justify-center p-6">
          <div className="w-full h-96 relative">
            {teacherData && teacherData?.teacher_pic !== "no image" ? (
              <img
                src={displayImage}
                className="w-full h-full object-cover rounded-2xl border-4 border-gray-200 shadow-lg"
              />
            ) : (
              <img
                src={User}
                alt={teacher.name}
                className="w-full h-full object-cover rounded-2xl border-4 border-gray-200 shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Teacher Info */}
        <div className="md:w-2/3 p-8 flex flex-col bg-primary-color  justify-between">
          <div>
            {/* Name & Subject */}
            <h1 className="text-3xl font-bold text-primary-text ">
              {teacherData?.teacher_name}
            </h1>
            <h2 className="text-xl text-primary-text font-medium mt-1">
              {teacher.subject}
            </h2>

            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-primary-text ">
              <p>
                <span className="font-semibold text-primary-text ">
                  Father/Husband Name:
                </span>
                {teacherData?.spouse}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  martial Status:
                </span>
                {teacherData?.marital_status}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">Phone:</span>
                {teacherData?.contact_number}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  NIC Number:
                </span>
                {teacherData?.nic_number}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  Gender:
                </span>
                {teacherData?.gender_name}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  Blood Group:
                </span>
                {teacherData?.blood_group_name}
              </p>

              <p>
                <span className="font-semibold">Address:</span>
                {teacherData?.current_adress}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">Email:</span>
                {teacherData?.email}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  joining Date:
                </span>
                {getOnlyDate(teacherData?.joining_date)}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  Salary:
                </span>
                {teacherData?.teacher_salary}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  Job Type:
                </span>
                {teacherData?.job_type}
              </p>
              <p>
                <span className="font-semibold text-primary-text ">
                  creator At:
                </span>
                {teacherData?.creator_first_name +
                  " " +
                  teacherData?.creator_last_name}
              </p>
            </div>

            {/* Qualifications */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-text  mb-3">
                Qualifications
              </h3>
              <div className="space-y-2">
                {teacherData?.qualification?.map((q, i) => (
                  <div
                    key={i}
                    className="p-3 bg-secondary-color rounded-lg border border-color-border shadow-sm flex justify-between items-center"
                  >
                    <span className="font-medium text-primary-text">
                      {q.degree}
                    </span>
                    <span className="text-primary-text">{q.university}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
              Contact
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
