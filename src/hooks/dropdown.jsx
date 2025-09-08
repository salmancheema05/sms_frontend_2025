import { useStateContext } from "@/context/stateProvider";

const useDropdownToggle = () => {
  const { dropdownShow, setDropdownShow } = useStateContext();
  const openDropdown = (toggleString) => {
    setDropdownShow(dropdownShow === toggleString ? null : toggleString);
  };
  return {
    openDropdown,
  };
};
export default useDropdownToggle;
