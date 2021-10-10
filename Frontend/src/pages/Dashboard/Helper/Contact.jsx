import React, { useEffect, useState } from "react";
import classes from "./helper.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import variable from "../../../config/variables";
import { essentialAction } from "../../../store/slice/essential";
import { useDispatch } from "react-redux";
import Overlay from "../../../components/UI/Overlay/Overlay";

const Contact = (props) => {
  const dispatch = useDispatch();
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(essentialAction.toggleSpinner());
      const response = await axios.get(
        `${variable.serverURL}/connect/form/all`
      );
      if (!response.data.success) {
        setOverlay({
          on: true,
          message: response.data.message,
        });
      } else {
        setContactData(response.data.contact);
      }
      dispatch(essentialAction.toggleSpinner());
    };
    fetchData();
  }, [dispatch]);
  const [overlay, setOverlay] = useState({
    on: false,
    message: null,
  });
  const overlayClose = () => {
    setOverlay({
      on: false,
      message: null,
    });
  };
  const deleteContact = async (id, index) => {
    dispatch(essentialAction.toggleSpinner());
    const response = await axios.get(
      `${variable.serverURL}/connect/form/${id}`
    );
    if (response.data) {
      setOverlay({
        on: true,
        message: response.data.message,
      });
      if (response.data.success) {
        setContactData((prev) => {
          let arr = prev;
          arr.splice(index, 1);
          return arr;
        });
      }
    }
    dispatch(essentialAction.toggleSpinner());
  };
  return (
    <div className={classes.main}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>SNo.</th>
            <th className={classes.th}>Name</th>
            <th className={classes.th}>Email</th>
            <th className={classes.th}>Message</th>
            <th className={classes.th}>Del</th>
          </tr>
        </thead>
        <tbody>
          {contactData.length !== 0 &&
            contactData.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td className={classes.td}>{index + 1}</td>
                  <td className={classes.td}>{item.name}</td>
                  <td className={classes.td}>{item.email}</td>
                  <td className={classes.td}>{item.message}</td>
                  <td className={classes.td}>
                    <IoIosCloseCircleOutline
                      onClick={() => deleteContact(item._id, index)}
                      className={classes.closeIcon}
                    />
                  </td>
                </tr>
              );
            })}
          {contactData.length === 0 && (
            <tr className={classes.null}>
              <td>No Contact Response Found!</td>
            </tr>
          )}
        </tbody>
      </table>

      {overlay.on && (
        <Overlay onClick={overlayClose} message={overlay.message} />
      )}
    </div>
  );
};
export default Contact;
