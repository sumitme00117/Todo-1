import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../redux/reducers/userReducer";
import toast from "react-hot-toast";

const ToastHandler = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.user);


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  return null; // No visible UI for this component
};

export default ToastHandler;
