import { useStateContext } from "@/context/stateProvider";
import AdminLayout from "@/layout/admin";
import AddNewTeacher from "@/pages/admin/teacherManagement/addNewTeacher";
import AdmitStudents from "@/pages/admin/admitStudent";
import AllStudents from "@/pages/admin/Allstudents";
import CreateClass from "@/pages/admin/classManagement/createClasses";
import Dashbaord from "@/pages/admin/dashboard";
import Login from "@/pages/login";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  AdminISAuthenticated,
  AdminISNotAuthenticated,
} from "../protectedRoutes";
import { useGetAllGenderapiQuery } from "@/services/gender";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "@/redux/genderSlice";
import SchoolRegistor from "@/pages/schoolRegister";
import useCreateToken from "@/hooks/createNewToken";

import { useGetAllSessionapiMutation } from "@/services/session";
import { setSession } from "@/redux/sessionSlice";
import ViewAllClasss from "@/pages/admin/classManagement/viewAllClass";
import { useGetAllBloodGroupListapiMutation } from "@/services/bloodList";
import { setBloodGroup } from "@/redux/bloodListSlice";
import { useGetAllMaritalListapiMutation } from "@/services/maritalStatus";
import { setMaritalStatus } from "@/redux/maritalStatus";
import ViewAllTeachers from "@/pages/admin/teacherManagement/viewAllTeachers";
import DetailTeacher from "@/pages/admin/teacherManagement/detailTeacher";
import ClassAsign from "@/pages/admin/teacherManagement/classAsign";
import AddSubject from "@/pages/admin/subject management/addSubject";
import { useGetAllLevelapiMutation } from "@/services/level";
import { setLevel } from "@/redux/level";
const Routers = () => {
  const { token, refreshToken } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const genderList = useSelector((state) => state.persisted?.genderList.list);
  const sessionList = useSelector((state) => state.persisted?.sessionList.list);
  const bloodGroup = useSelector(
    (state) => state.persisted?.bloodGroupList.list
  );
  const maritalStatus = useSelector(
    (state) => state.persisted?.maritalStatusList.list
  );
  const levelList = useSelector((state) => state.persisted?.levelList.list);
  const location = useLocation();
  const { setPageName } = useStateContext();
  const { data: gender, error } = useGetAllGenderapiQuery();
  const [getAllSessionapi] = useGetAllSessionapiMutation();
  const [getAllBloodGroupListapi] = useGetAllBloodGroupListapiMutation();
  const [getAllMaritalListapi] = useGetAllMaritalListapiMutation();
  const [getAllLevelapi] = useGetAllLevelapiMutation();
  const { createNewToken } = useCreateToken();
  const dispatch = useDispatch();
  const checkLoctation = () => {
    if (location.pathname === "/") {
      setPageName("Dashboard");
    } else {
      let PageLink = location.pathname;
      let pageName = PageLink.replace(/^\/|\/$/g, "")
        .split(/[-/]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setPageName(pageName);
    }
  };
  const getAllGender = async () => {
    if (gender?.result) {
      dispatch(setGender(gender.result));
    }
  };
  const getAllSession = async () => {
    try {
      if (token) {
        const res = await getAllSessionapi({ token: token });
        dispatch(setSession(res.data.message));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getAllbloodGroup = async () => {
    try {
      const res = await getAllBloodGroupListapi({ token: token });
      dispatch(setBloodGroup(res.data.result));
    } catch (err) {
      console.error(err);
    }
  };
  const getAllMeritalStatus = async () => {
    try {
      const res = await getAllMaritalListapi({ token: token });
      dispatch(setMaritalStatus(res.data.result));
    } catch (err) {
      console.error(err);
    }
  };
  const getAllLevel = async () => {
    try {
      const res = await getAllLevelapi({ token: token });
      dispatch(setLevel(res.data.result));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (token) {
      if (
        genderList.length == 0 &&
        sessionList.length == 0 &&
        bloodGroup.length == 0 &&
        maritalStatus.length == 0 &&
        levelList.length == 0
      ) {
        console.log("api call in route file");
        getAllGender();
        getAllSession();
        getAllbloodGroup();
        getAllMeritalStatus();
        getAllLevel();
      }
    }
  }, [gender, token, dispatch]);

  useEffect(() => {
    checkLoctation();
  }, [location]);
  useEffect(() => {
    const root = document.documentElement; // <html> element

    function applyDarkMode() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    applyDarkMode();

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", applyDarkMode);

    // Cleanup listener on unmount
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", applyDarkMode);
    };
  }, []);
  return (
    <Routes>
      <Route element={<AdminISNotAuthenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="school-registor" element={<SchoolRegistor />} />
      </Route>
      <Route element={<AdminISAuthenticated />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashbaord />} />
          <Route path="all-students" element={<AllStudents />} />
          <Route path="admit-students" element={<AdmitStudents />} />
          <Route path="create-classes" element={<CreateClass />} />
          <Route path="add-new-teacher" element={<AddNewTeacher />} />
          <Route path="view-all-classes" element={<ViewAllClasss />} />
          <Route path="view-all-teachers" element={<ViewAllTeachers />} />
          <Route path="detail/:teacher_id" element={<DetailTeacher />} />
          <Route path="class-asign-to-teacher" element={<ClassAsign />} />
          <Route path="add-subject" element={<AddSubject />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
